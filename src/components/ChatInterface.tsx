import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native-web";

const ChatInterface = () => {
    const [messages, setMessages] = useState<{ id: string, text: string, sender: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now().toString(), text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch(`https://indiankanoon.org/api/v1/search/?q=${encodeURIComponent(input)}`, {
                headers: {
                    Authorization: `Token ${import.meta.env.VITE_KANOON_API_TOKEN}`,
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const caseData = data.results[0];
                const caseTitle = caseData.caseName || "Relevant Case";
                const caseSummary = caseData.snippet || caseData.plain_text_summary || "No detailed summary available.";

                const botResponseText = `${caseTitle}: ${caseSummary}`;
                const botMessage = { id: Date.now().toString(), text: botResponseText, sender: "bot" };
                setMessages([...messages, userMessage, botMessage]);
            } else {
                const noCaseMessage = { id: Date.now().toString(), text: "No relevant cases found.", sender: "bot" };
                setMessages([...messages, userMessage, noCaseMessage]);
            }
        } catch (error) {
            console.error("Error fetching legal data:", error);
            const errorMessage = { id: Date.now().toString(), text: "Error retrieving legal information.", sender: "bot" };
            setMessages([...messages, userMessage, errorMessage]);
        }

        setInput("");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={item.sender === "user" ? styles.userMessage : styles.botMessage}>
                        {item.text}
                    </Text>
                )}
            />
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask a legal question..."
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#121212" },
    input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 8, color: "#fff" },
    userMessage: { alignSelf: "flex-end", backgroundColor: "#4CAF50", color: "#fff", padding: 10, margin: 5, borderRadius: 5 },
    botMessage: { alignSelf: "flex-start", backgroundColor: "#333", color: "#fff", padding: 10, margin: 5, borderRadius: 5 },
});

export default ChatInterface;
