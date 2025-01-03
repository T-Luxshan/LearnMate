import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/store"; // Adjust the path based on your project structure

const HomePage = () => {
  const route = useRoute();
  const { email } = route.params;

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const clickCount = useSelector((state) => state.clickCount.count);

  useEffect(() => {

    const dummyData = [
      {
        ID: "1",
        Author: "John Doe",
        Title: "Advanced React",
        Publisher: "McGraw-Hill Education",
        Year: "2023",
        Pages: "250",
        Language: "English",
        Size: "5MB",
        Extension: "PDF",
        encrypted_url: "https://example.com/advanced-react",
      },
      {
        ID: "2",
        Author: "Jane Smith",
        Title: "Learning JavaScript",
        Publisher: "McGraw-Hill Education",
        Year: "2019",
        Pages: "300",
        Language: "English",
        Size: "6MB",
        Extension: "ePub",
        encrypted_url: "https://example.com/learning-javascript",
      },
      {
        ID: "3",
        Author: "Mark Johnson",
        Title: "Python for Data Science",
        Publisher: "McGraw-Hill Education",
        Year: "2021",
        Pages: "350",
        Language: "English",
        Size: "8MB",
        Extension: "PDF",
        encrypted_url: "https://example.com/python-for-data-science",
      },
      {
        ID: "4",
        Author: "Mark Johnson",
        Title: "Python for Data Science",
        Publisher: "McGraw-Hill Education",
        Year: "2021",
        Pages: "350",
        Language: "English",
        Size: "8MB",
        Extension: "PDF",
        encrypted_url: "https://example.com/python-for-data-science",
      },
      {
        ID: "5",
        Author: "Mark Johnson",
        Title: "Python for Data Science",
        Publisher: "McGraw-Hill Education",
        Year: "2021",
        Pages: "350",
        Language: "English",
        Size: "8MB",
        Extension: "PDF",
        encrypted_url: "https://example.com/python-for-data-science",
      },
      {
        ID: "6",
        Author: "Mark Johnson",
        Title: "Python for Data Science",
        Publisher: "McGraw-Hill Education",
        Year: "2021",
        Pages: "350",
        Language: "English",
        Size: "8MB",
        Extension: "PDF",
        encrypted_url: "https://example.com/python-for-data-science",
      },
    ];

    // setData(dummyData);
  // }, []);

    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://searchbookpdf.p.rapidapi.com/search/publisher",
        params: { q: "MCGraw-Hill Education" },
        headers: {
          'x-rapidapi-key': 'cf01554596mshf17a3bc5ae9e8d6p10060fjsn858242f79812',
          'x-rapidapi-host': 'searchbookpdf.p.rapidapi.com'
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data && Array.isArray(response.data.result)) {
          const formattedData = response.data.result.map((item) => ({
            ID: item.ID,
            Author: item.Author || "Unknown",
            Title: item.Title || "Untitled",
            Publisher: item.Publisher || "Unknown Publisher",
            Year: item.Year || "N/A",
            Pages: item.Pages || "N/A",
            Language: item.Language || "Unknown",
            Size: item.Size || "N/A",
            Extension: item.Extension || "Unknown",
            encrypted_url: item.encrypted_url || "",
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = () => {
    dispatch(increment());
  };

  const renderItem = ({ item }) => {
    const status = parseInt(item.Year) >= 2000 ? "Modern" : "Classic";

    return (
      <TouchableOpacity style={styles.card} onPress={handleItemClick}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.author}>Author: {item.Author}</Text>
        <Text style={styles.publisher}>Publisher: {item.Publisher}</Text>
        <Text style={styles.year}>
          Year: {item.Year} ({status})
        </Text>
        <Text style={styles.details}>
          Pages: {item.Pages} | Size: {item.Size} | Format: {item.Extension}
        </Text>
        <Text style={styles.language}>Language: {item.Language}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {email}!</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.contentContainer}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Click Count: {clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 60,
    color: "#333",
  },
  contentContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: "#555",
  },
  publisher: {
    fontSize: 12,
    color: "#777",
  },
  year: {
    fontSize: 12,
    color: "green",
  },
  details: {
    fontSize: 12,
    color: "#555",
    marginVertical: 5,
  },
  language: {
    fontSize: 12,
    color: "#333",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 2,
  },
});

export default HomePage;
