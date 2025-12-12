const HomePage = () => {
  const allNotes = [
    {
      title: "App Feature Ideas1",
      content: "Dark mode, offline access and rate limitinf",
      date: "May 16, 2025",
    },
    {
      title: "App Feature Ideas2",
      content: "Dark mode, offline access and rate limitinf",
      date: "May 16, 2025",
    },
    {
      title: "App Feature Ideas3",
      content: "Dark mode, offline access and rate limitinf",
      date: "May 16, 2025",
    },
    {
      title: "App Feature Ideas4",
      content: "Dark mode, offline access and rate limitinf",
      date: "May 16, 2025",
    },
    {
      title: "App Feature Ideas5",
      content: "Dark mode, offline access and rate limitinf",
      date: "May 16, 2025",
    },
  ];

  return (
    <div className="note-app">
      <div className="container">
        <div className="note-container grid">
          {allNotes.map((note) => (
            <div className="note-card" key={note.name}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
