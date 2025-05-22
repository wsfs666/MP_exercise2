import React, { useState } from 'react';
import {View,Text,TextInput,Button,FlatList,TouchableOpacity,StyleSheet,} from 'react-native';
import { useInbox } from '../components/InboxContext'; // Import the custom context hook

// Home screen component displaying all inbox categories
export default function HomeScreen({ navigation }) {
  // Get inbox data and manipulation methods from context
  const { inboxes, addInbox, deleteInbox, editInbox } = useInbox();

  const [text, setText] = useState('');           // State for new inbox input
  const [editId, setEditId] = useState(null);     // ID of inbox currently being edited
  const [editText, setEditText] = useState('');   // Text value for editing inbox title

  // Handle adding a new inbox category
  const handleAdd = () => {
    if (text.trim()) {
      addInbox(text.trim());
      setText('');
    }
  };

  // Navigate to the Messages screen for a specific inbox
  const handleInboxPress = (inbox) => {
    navigation.navigate('Messages', {
      inboxId: inbox.id,
      inboxTitle: inbox.title,
    });
  };

  return (
    <View style={styles.container}>
      {/* Display inbox categories in a list */}
      <FlatList
        data={inboxes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.inboxItem}>
            {editId === item.id ? (
              // If this inbox is being edited, show input + Save button
              <>
                <TextInput
                  style={styles.input}
                  value={editText}
                  onChangeText={setEditText}
                />
                <Button
                  title="Save"
                  onPress={() => {
                    editInbox(item.id, editText);
                    setEditId(null);
                    setEditText('');
                  }}
                />
              </>
            ) : (
              // Default display: inbox title, Edit and Delete buttons
              <>
                <TouchableOpacity style={styles.card} onPress={() => handleInboxPress(item)}>
                  <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => {
                    setEditId(item.id);         // Enter edit mode
                    setEditText(item.title);    // Pre-fill current title
                  }}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteInbox(item.id)}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      {/* Input field and button to add a new inbox */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new category"
      />
      <Button title="Send" onPress={handleAdd} />
    </View>
  );
}

// Styles for layout and elements
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inboxItem: { marginBottom: 15 },
  card: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    borderRadius: 10,
  },
  text: { fontSize: 18 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  edit: { color: 'blue', marginRight: 10 },
  delete: { color: 'red' },
});


