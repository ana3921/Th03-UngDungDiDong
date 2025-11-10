import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Task {
  id: string;
  text: string;
}

export default function Bai4Screen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const themCongViec = () => {
    Keyboard.dismiss();
    
    if (task.trim() === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập tên công việc!');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const xoaCongViec = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa công việc này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => setTasks(tasks.filter(item => item.id !== id)),
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity 
      style={styles.taskItem}
      onLongPress={() => xoaCongViec(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => xoaCongViec(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>ToDo List</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={task}
            onChangeText={setTask}
            placeholder="Nhập công việc mới..."
            placeholderTextColor="#999"
            onSubmitEditing={themCongViec}
          />
          <TouchableOpacity style={styles.addButton} onPress={themCongViec}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {tasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>📝</Text>
              <Text style={styles.emptySubtext}>Chưa có công việc nào</Text>
            </View>
          ) : (
            <>
              <Text style={styles.listTitle}>Có {tasks.length} công việc</Text>
              <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4757',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});
