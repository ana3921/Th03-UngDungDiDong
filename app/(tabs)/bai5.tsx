import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const API_KEY = '9fb8587ea5e57e047b7981103c2ded65';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function WeatherScreen() {
  const [city, setCity] = useState('Hanoi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Vui lòng nhập tên thành phố');
      return;
    }

    setLoading(true);
    setError('');

    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: cityName,
            appid: API_KEY,
            units: 'metric',
            lang: 'vi',
          },
        });

        setWeather(response.data);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Không tìm thấy thành phố');
        } else {
          setError('Lỗi kết nối. Vui lòng thử lại!');
        }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Dự Báo Thời Tiết</Text>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên thành phố..."
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
          </View>
        )}

        {/* Error */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Weather Data */}
        {weather && !loading && (
          <View style={styles.weatherCard}>
            {/* Location */}
            <Text style={styles.locationText}>
              📍 {weather.name}, {weather.sys.country}
            </Text>

            {/* Weather Icon & Temperature */}
            <View style={styles.mainWeatherContainer}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                }}
                style={styles.weatherIcon}
              />
              <Text style={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              {weather.weather[0].description}
            </Text>

            {/* Weather Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🌡️</Text>
                <Text style={styles.detailLabel}>Cảm giác</Text>
                <Text style={styles.detailValue}>
                  {Math.round(weather.main.feels_like)}°C
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>💧</Text>
                <Text style={styles.detailLabel}>Độ ẩm</Text>
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>💨</Text>
                <Text style={styles.detailLabel}>Gió</Text>
                <Text style={styles.detailValue}>
                  {weather.wind.speed} m/s
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🎚️</Text>
                <Text style={styles.detailLabel}>Áp suất</Text>
                <Text style={styles.detailValue}>
                  {weather.main.pressure} hPa
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  searchButtonText: {
    fontSize: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#C62828',
    fontSize: 16,
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  description: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
