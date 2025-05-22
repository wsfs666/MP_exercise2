import React, { useState } from 'react';
import {View,Text,TextInput,Button, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import { useInbox } from '../components/InboxContext'; // Import the inbox context

// Screen to view, add, edit, and delete messages in a specific inbox
export default function MessagesScreen({ route }) {
  // Get inbox ID and title from route parameters (passed from HomeScreen)
  const { inboxId, inboxTitle } = route.params;

  // Access inbox data and message operations from context
  const {inboxes,addMessageToInbox,deleteMessageFromInbox,editMessageFromInbox } = useInbox();

  const [newMsg, setNewMsg] = useState('');       // New message input state
  const [editId, setEditId] = useState(null);     // Currently editing message ID
  const [editText, setEditText] = useState('');   // Input value while editing

  // Find the current inbox by ID
  const currentInbox = inboxes.find(inbox => inbox.id === inboxId);

  if (!currentInbox) {
    return <Text>Inbox not found</Text>; // Error fallback if inbox is missing
  }

  // Add new message to current inbox
  const addMessage = () => {
    if (newMsg.trim()) {
      addMessageToInbox(inboxId, newMsg.trim());
      setNewMsg('');
    }
  };

  // Renders each message with Edit/Delete or Save/Cancel if in edit mode
  const renderItem = ({ item }) => (
    <View style={styles.messageBox}>
      {editId === item.id ? (
        // Edit mode: show input + Save/Cancel buttons
        <>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
          />
          <View style={styles.buttonRow}>
            <Button
              title="Save"
              onPress={() => {
                editMessageFromInbox(inboxId, item.id, editText);
                setEditId(null);
                setEditText('');
              }}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setEditId(null);
                setEditText('');
              }}
              color="gray"
            />
          </View>
        </>
      ) : (
        // Default display: message text + Edit/Delete buttons
        <>
          <Text style={styles.message}>{item.content}</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                setEditId(item.id);
                setEditText(item.content);
              }}
            >
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteMessageFromInbox(inboxId, item.id)}
            >
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Inbox title */}
      <Text style={styles.header}>Messages in: {inboxTitle}</Text>

      {/* Message list */}
      <FlatList
        data={currentInbox.messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Input for new message */}
      <TextInput
        style={styles.input}
        value={newMsg}
        onChangeText={setNewMsg}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={addMessage} />
    </View>
  );
}

// Styles for the screen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  messageBox: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  edit: {
    color: 'blue',
    marginRight: 12,
  },
  delete: {
    color: 'red',
  },
});

