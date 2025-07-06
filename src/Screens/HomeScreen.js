import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { fetchPosts, addPost, updatePost, deletePost } from '../Utils/db';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const reload = async () => {
    const snap = await fetchPosts();
    setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));  
  };

  useEffect(() => { reload(); }, []);

  const handleAdd = async () => {
    if (!newText.trim()) return;
    await addPost(user.uid, newText.trim());
    setNewText('');
    reload();
  };

  const handleSave = async id => {
    if (!editText.trim()) return;
    await updatePost(id, editText.trim());
    setEditingId(null);
    reload();
  };

  const handleDelete = async id => {
    await deletePost(id);
    setPosts(ps => ps.filter(p => p.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Logout" onPress={logout} />
      <FlatList
        data={posts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8, borderBottomWidth: 1, paddingBottom: 8 }}>
            {editingId === item.id ? (
              <>
                <TextInput value={editText} onChangeText={setEditText} style={{ borderWidth:1, padding:4, marginBottom:4 }} />
                <Button title="Save" onPress={() => handleSave(item.id)} />
                <Button title="Cancel" onPress={() => setEditingId(null)} />
              </>
            ) : (
              <>
                <Text style={{ fontSize:16 }}>{item.text}</Text>
                {item.authorId === user.uid && (
                  <View style={{ flexDirection:'row', marginTop:4 }}>
                    <Button title="Edit" onPress={() => { setEditingId(item.id); setEditText(item.text); }} />
                    <View style={{ width:8 }} />
                    <Button title="Delete" onPress={() => handleDelete(item.id)} />
                  </View>
                )}
              </>
            )}
          </View>
        )}
      />
      <View style={{ marginTop:16 }}>
        <TextInput
          placeholder="What's on your mind?"
          value={newText}
          onChangeText={setNewText}
          style={{ borderWidth:1, padding:8, marginBottom:8 }}
        />
        <Button title="Post" onPress={handleAdd} />
      </View>
    </View>
  );
}