import React, { createContext, useContext, useState } from 'react';

// Create the Inbox context
const InboxContext = createContext();

// Initial default inbox data
const initialInboxes = [
  { id: '1', title: 'You', messages: [] },
  { id: '2', title: 'Love', messages: [] },
  { id: '3', title: 'Friends', messages: [] },
];

// Context provider component
export const InboxProvider = ({ children }) => {
  const [inboxes, setInboxes] = useState(initialInboxes);

  // Add a new inbox
  const addInbox = (title) => {
    const newInbox = {
      id: Date.now().toString(),
      title,
      messages: [],
    };
    setInboxes((prev) => [...prev, newInbox]);
  };

  // Edit an existing inbox title
  const editInbox = (id, newTitle) => {
    setInboxes((prev) =>
      prev.map((inbox) => (inbox.id === id ? { ...inbox, title: newTitle } : inbox))
    );
  };

  // Delete an inbox by ID
  const deleteInbox = (id) => {
    setInboxes((prev) => prev.filter((inbox) => inbox.id !== id));
  };

  // Add a new message to a specific inbox
  const addMessageToInbox = (inboxId, messageContent) => {
    setInboxes((prev) =>
      prev.map((inbox) =>
        inbox.id === inboxId
          ? {
              ...inbox,
              messages: [
                ...inbox.messages,
                {
                  id: Date.now().toString(),
                  content: messageContent,
                },
              ],
            }
          : inbox
      )
    );
  };

  // Delete a message from a specific inbox
  const deleteMessageFromInbox = (inboxId, messageId) => {
    setInboxes((prev) =>
      prev.map((inbox) =>
        inbox.id === inboxId
          ? {
              ...inbox,
              messages: inbox.messages.filter((msg) => msg.id !== messageId),
            }
          : inbox
      )
    );
  };

  // Edit a message in a specific inbox
  const editMessageFromInbox = (inboxId, messageId, messageContent) => {
    setInboxes((prev) =>
      prev.map((inbox) =>
        inbox.id === inboxId
          ? {
              ...inbox,
              messages: inbox.messages.map((msg) =>
                msg.id === messageId ? { ...msg, content: messageContent } : msg
              ),
            }
          : inbox
      )
    );
  };

  // Provide state and actions to children components
  return (
    <InboxContext.Provider
      value={{
        inboxes,
        addInbox,
        editInbox,
        deleteInbox,
        addMessageToInbox,
        deleteMessageFromInbox,
        editMessageFromInbox,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

// Hook to access the Inbox context from other components
export const useInbox = () => useContext(InboxContext);

