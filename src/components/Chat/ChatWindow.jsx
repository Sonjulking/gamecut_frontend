import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Divider,
    TextField,
    InputAdornment,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = ({ onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [messages, setMessages] = useState([
        { id: 1, text: "안녕하세요!", from: "other" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        setMessages(prev => [...prev, { id: Date.now(), text: trimmed, from: "me" }]);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
            <Box
                    sx={{
                        position: "fixed",
                        ...(isMobile
                                ? {
                                    top: 0,
                                    left: 0,
                                    width: "100vw",
                                    height: "100vh",
                                    borderRadius: 0,
                                }
                                : {
                                    bottom: 100,
                                    right: 24,
                                    width: 320,
                                    height: 400,
                                    borderRadius: "0.75rem",
                                }),
                        bgcolor: "#1a1a1a",
                        color: "#fff",
                        boxShadow: 5,
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1300,
                    }}
            >
                {/* 헤더 */}
                <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            bgcolor: "#2a2a2a",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTopLeftRadius: isMobile ? 0 : "0.75rem",
                            borderTopRightRadius: isMobile ? 0 : "0.75rem",
                        }}
                >
                    <Typography variant="subtitle1" fontWeight="bold">
                        실시간 채팅
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ borderColor: "#444" }} />

                {/* 메시지 목록 */}
                <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#555",
                                borderRadius: "4px",
                            },
                        }}
                >
                    {messages.map((msg) => (
                            <Box
                                    key={msg.id}
                                    sx={{
                                        alignSelf: msg.from === "me" ? "flex-end" : "flex-start",
                                        bgcolor: msg.from === "me" ? "#42a5f5" : "#333",
                                        color: "#fff",
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        maxWidth: "80%",
                                        wordBreak: "break-word",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                    }}
                            >
                                {msg.text}
                            </Box>
                    ))}
                </Box>

                <Divider sx={{ borderColor: "#444" }} />

                {/* 입력창 */}
                <Box
                        sx={{
                            px: 1.5,
                            pt: 1.5,
                            pb: { xs: 5, sm: 3, md: 2 }, // 반응형 패딩
                        }}
                >
                    <TextField
                            fullWidth
                            placeholder="메시지 입력..."
                            variant="outlined"
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            sx={{
                                input: { color: "#fff" },
                                bgcolor: "#2a2a2a",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#444" },
                                    "&:hover fieldset": { borderColor: "#666" },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                        <InputAdornment position="end">
                                            <SendIcon
                                                    onClick={handleSend}
                                                    sx={{ cursor: "pointer", color: "white" }}
                                            />
                                        </InputAdornment>
                                ),
                            }}
                    />
                </Box>
            </Box>
    );
};

export default ChatWindow;
