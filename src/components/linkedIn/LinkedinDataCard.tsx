const LinkedInDataCard = ({ profileData }: any) => {
  if (!profileData) return null;

  const {
    firstName,
    lastName,
    summary,
    projects,
    headline,
    geo,
    backgroundImage,
    profilePicture,
    position,
    educations,
  } = profileData;

  // // Background Image URL (from profile)
  const backgroundImageNew = backgroundImage ? backgroundImage[0].url : "";

  // Profile Picture (from profile)

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-2xl rounded-2xl overflow-hidden border border-purple-700/30">
      {/* Background Image */}
      <div className="relative z-10 mb-2">
        <img
          src={backgroundImageNew}
          alt="Background"
          className="w-full h-48 object-cover opacity-60"
        />
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-purple-900/50 to-purple-800/80"></div>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center items-center -mt-1 z-20">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-lg"
        />
      </div>

      <div className="text-center p-4">
        <h2 className="text-2xl font-semibold text-white">{`${firstName} ${lastName}`}</h2>
        <p className="text-purple-200">{headline}</p>
        <p className="text-sm text-purple-300">{geo?.full}</p>
      </div>

      {/* About Section */}
      {summary && (
        <div className="p-4">
          <h3 className="font-semibold text-white">About</h3>
          <p className="text-purple-100">{summary}</p>
        </div>
      )}

      {/* Current Company */}
      {position && position.length > 0 && (
        <div className="p-4 border-t border-purple-600/30">
          <h3 className="font-semibold text-white">Current Position</h3>
          {position.map((job: any, index: any) => (
            <div key={index} className="mt-2">
              <h4 className="text-purple-100 font-semibold">{job.title}</h4>
              <p className="text-purple-200">{job.companyName}</p>
              <p className="text-purple-300">{job.location}</p>
              <a
                href={job.companyURL}
                className="text-blue-400 hover:text-blue-300 hover:underline mt-2 block transition-colors"
              >
                Company LinkedIn
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {educations && educations.length > 0 && (
        <div className="p-4 border-t border-purple-600/30">
          <h3 className="font-semibold text-white">Education</h3>
          {educations.map((education: any, index: any) => (
            <div key={index} className="mt-2">
              <h4 className="text-purple-100 font-semibold">
                {education.degree} in {education.fieldOfStudy}
              </h4>
              <p className="text-purple-200">{education.schoolName}</p>
              <p className="text-purple-300">
                {new Date(
                  education.start.year,
                  education.start.month - 1
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  education.end.year,
                  education.end.month - 1
                ).toLocaleDateString()}
              </p>
              <a
                href={education.url}
                className="text-blue-400 hover:text-blue-300 hover:underline mt-2 block transition-colors"
              >
                School LinkedIn
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section (if available) */}

      {projects && projects.items && projects.items.length > 0 && (
        <div className="p-4 border-t border-purple-600/30">
          <h3 className="font-semibold text-white">Projects</h3>
          {projects.items.map((project: any, index: any) => (
            <div key={index} className="mt-2">
              <h4 className="text-purple-100 font-semibold">{project.title}</h4>
              <p className="text-purple-200">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedInDataCard;
