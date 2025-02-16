function Messages() {
  const messages = [
    { id: 1, title: "Welcome!", content: "This is our exclusive clubhouse." },
    {
      id: 2,
      title: "Secret Society",
      content: "Only members can see who posted this.",
    },
  ];

  return (
    <div>
      <h2>Messages</h2>
      {messages.map((msg) => (
        <div key={msg.id}>
          <h3>{msg.title}</h3>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;
