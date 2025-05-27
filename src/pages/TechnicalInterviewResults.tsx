import { useEffect, useState } from 'react';
import { collection, getDocs, query, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Define types for User, Result, and Round data
interface User {
  name: string;
  email: string;
  timestamp: string;
}

interface Round1 {
  finalScore: number;
  attentionRate: number;
  totalTimeTaken: number;
  user: User;
  convertedFinalScore?: number;
  weightedMarks?: number;
  timeSpent?: number;
}

interface Round2 {
  level2Data: {
    marks: number;
  };
  weightedMarks?: number;
}

interface Result {
  id: string;
  user: User;
  round1: Round1;
  round2: Round2;
  finalScore: number;
  passState?: string;
}

export function TechnicalInterviewResults() {
  const [results, setResults] = useState<Result[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(collection(db, 'techRound'));
        const snapshot = await getDocs(q);

        const fetchedResults: Result[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as DocumentData,
        })) as Result[];

        console.log("Fetched Results:", fetchedResults);

        fetchedResults.forEach((result) => {
          const round1Raw = result.round1?.finalScore || 0;
          const round1Converted = (round1Raw / 20) * 100;
          result.round1.convertedFinalScore = round1Converted;

          const round2Marks = result.round2?.level2Data?.marks || 0;
          result.round1.weightedMarks = round1Converted * 0.60;
          result.round2.weightedMarks = round2Marks * 0.40;
          result.finalScore = result.round1.weightedMarks + result.round2.weightedMarks;

          const totalTimeSeconds = result.round1?.totalTimeTaken || 0;
          const timeInMinutes = totalTimeSeconds / 60;
          result.round1.timeSpent = timeInMinutes;

          if (result.finalScore > 65) {
            result.passState = 'Pass';
          } else if (result.finalScore > 45) {
            result.passState = 'Moderate';
          } else {
            result.passState = 'Fail';
          }
        });

        fetchedResults.sort((a, b) => {
          const aTime = new Date(a.round1?.user?.timestamp || 0).getTime();
          const bTime = new Date(b.round1?.user?.timestamp || 0).getTime();
          return bTime - aTime;
        });

        setResults(fetchedResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  const generatePDF = () => {
    if (!results.length) {
      alert("No data available to generate the PDF.");
      return;
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Interview Results Report', 20, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Generated on: ${currentDate}`, 20, 28);

    const startX = 20;
    let startY = 45;
    const rowHeight = 8;
    const colWidths = [35, 30, 30, 40, 30, 30, 30, 25, 25];
    let currentX = startX;

    const headers = [
      'Name',
      'Theory Mark',
      'Coding Mark',
      'Attention %',
      'Weighted Theory',
      'Weighted Coding',
      'Final Score',
      'Time (mins)',
      'Status',
    ];

    doc.setFillColor(240, 240, 240);
    doc.rect(startX, startY - rowHeight, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);

    currentX = startX;
    headers.forEach((header, idx) => {
      doc.text(header, currentX + 2, startY - 2);
      currentX += colWidths[idx];
    });

    currentX = startX;
    headers.forEach((header, idx) => {
      doc.setDrawColor(180, 180, 180);
      doc.rect(currentX, startY - rowHeight, colWidths[idx], rowHeight);
      currentX += colWidths[idx];
    });

    startY += 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    results.forEach((result, rowIdx) => {
      const rowData = [
        result.user?.name || 'N/A',
        result.round1?.convertedFinalScore?.toFixed(2) || '0',
        result.round2?.level2Data?.marks?.toFixed(2) || '0',
        `${result.round1?.attentionRate?.toFixed(2) ?? 0}%`,
        result.round1?.weightedMarks?.toFixed(2) || '0',
        result.round2?.weightedMarks?.toFixed(2) || '0',
        result.finalScore?.toFixed(2) || '0',
        result.round1?.timeSpent?.toFixed(2) || 'N/A',
        result.passState || 'N/A',
      ];

      if (rowIdx % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(startX, startY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }

      currentX = startX;
      rowData.forEach((cell, colIdx) => {
        const isNumber = !isNaN(parseFloat(cell)) || cell.includes('%');
        const textX = isNumber ? currentX + colWidths[colIdx] / 2 : currentX + 2;
        const align = isNumber ? 'center' : 'left';

        if (colIdx === 6) {
          doc.setTextColor(0, 100, 0);
          doc.setFont('helvetica', 'bold');
        } else if (colIdx === 1 || colIdx === 2) {
          doc.setTextColor(0, 0, 150);
          doc.setFont('helvetica', 'normal');
        } else if (colIdx === 8) {
          if (cell === 'Pass') {
            doc.setTextColor(0, 128, 0);
          } else if (cell === 'Moderate') {
            doc.setTextColor(204, 153, 0);
          } else {
            doc.setTextColor(204, 0, 0);
          }
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setTextColor(50, 50, 50);
          doc.setFont('helvetica', 'normal');
        }

        doc.text(cell.toString(), textX, startY + 5, { align });
        doc.setDrawColor(200, 200, 200);
        doc.rect(currentX, startY, colWidths[colIdx], rowHeight);
        currentX += colWidths[colIdx];
      });

      startY += rowHeight;
    });

    const totalCandidates = results.length;
    const avgFinalScore =
      results.reduce((sum, r) => sum + (r.finalScore || 0), 0) / totalCandidates;

    startY += 10;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(
      `Summary: ${totalCandidates} candidates evaluated | Average Final Score: ${avgFinalScore.toFixed(2)}`,
      startX,
      startY
    );

    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page 1 of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);

    doc.save("technical-interview-results.pdf");
  };

  const handleSendEmail = async (email: string, name: string) => {
    if (!email) {
      alert(`No email found for ${name}`);
      return;
    }

    try {
      const response = await fetch('https://oop.mindcript.com/email-sender/mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          subject: 'Next Round Selection',
          message: `Congratulations ${name}! You have been selected for the next round of the technical interview. Please log in to proceed to the next round using this link: https://hire-genius-front-end-application.vercel.app/.`
        }),
      });

      if (response.ok) {
        alert(`Email sent to ${name}`);
      } else {
        alert(`Failed to send email to ${name}`);
      }
    } catch (error) {
      console.error(`Error sending email to ${name}:`, error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <PageMeta
        title="Technical Interview Results"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Technical Interview Results" />
      <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-2">
          <div className="flex justify-end mb-6">
            <AwesomeButton
              type="primary"
              onReleased={generatePDF}
              style={{
                "--button-primary-color": "#4b4752",
                "--button-primary-color-dark": "#352f43",
                "--button-primary-color-light": "#ffffff",
                "--button-primary-color-hover": "#352f43",
                "--button-primary-color-active": "#352f43",
                "--button-default-border-radius": "8px",
                height: "45px",
                fontSize: "18px",
                borderRadius: "10px",
                borderColor: "black"
              }}
            >
              Download Results PDF
            </AwesomeButton>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full text-lg table-auto">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-8 py-6 text-left text-base font-semibold text-gray-700">Name</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Theoretical Mark</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Coding Mark</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Attention Rate</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Weighted Theory (60%)</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Weighted Coding (40%)</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Final Score</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Time Taken (mins)</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Status</th>
                  <th className="px-8 py-6 text-center text-base font-semibold text-gray-700">Send Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-8 py-6 text-gray-900 font-medium text-base">{result.user?.name || "N/A"}</td>
                    <td className="px-8 py-6 text-center text-blue-700">{(result.round1?.convertedFinalScore || 0).toFixed(2)}</td>
                    <td className="px-8 py-6 text-center text-green-700">{(result.round2?.level2Data?.marks || 0).toFixed(2)}</td>
                    <td className="px-8 py-6 text-center text-purple-700">{(result.round1?.attentionRate?.toFixed(2) || 0) + "%"}</td>
                    <td className="px-8 py-6 text-center text-gray-700 font-medium text-base">{(result.round1?.weightedMarks || 0).toFixed(2)}</td>
                    <td className="px-8 py-6 text-center text-gray-700 font-medium text-base">{(result.round2?.weightedMarks || 0).toFixed(2)}</td>
                    <td className="px-8 py-6 text-center text-purple-800 font-bold">{(result.finalScore || 0).toFixed(2)}</td>
                    <td className="px-8 py-6 text-center text-gray-500 text-base">{(result.round1?.timeSpent?.toFixed(2) || "N/A")}</td>
                    <td
                      className={`px-8 py-6 text-center font-semibold ${
                        result.passState === 'Pass'
                          ? 'text-green-600'
                          : result.passState === 'Moderate'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {result.passState}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        type="button"
                        className="btn btn-primary p-2 w-28 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => handleSendEmail(result.user?.email, result.user?.name)}
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-8 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-xl font-medium text-gray-600">No results found</p>
                        <p className="text-base text-gray-500 mt-2">Results will appear here once interviews are completed</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}