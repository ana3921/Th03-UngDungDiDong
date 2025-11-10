import { ThemedView } from '@/components/themed-view';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Card danh thiếp */}
      <View style={styles.card}>
        {/* Ảnh đại diện */}
        <Image
          source={require('@/assets/images/avatar.png')}
          style={styles.avatar}
        />
        
        {/* Thông tin cá nhân */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Nguyễn Gia Ân</Text>
          <Text style={styles.job}>Sinh Viên</Text>
          
          {/* Email và số điện thoại */}
          <View style={styles.contactContainer}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactText}>AnNG.B23CC002@stu.ptit.edu.vn</Text>
          </View>
          
          <View style={styles.contactContainer}>
            <Text style={styles.contactIcon}>📱</Text>
            <Text style={styles.contactText}>0898 418 226</Text>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    // Đổ bóng iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Đổ bóng Android
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  job: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
});
