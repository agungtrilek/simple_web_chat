import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

interface SendChatParams {
  message: string;
  id: string;
}

export async function sendChatFirestore({
  message,
  id,
}: SendChatParams): Promise<void> {
  if (!message?.trim()) return; // mencegah text kosong

  const user = auth.currentUser;
  if (!user) throw new Error("Anda Belum login"); // cegah error jika user belum login
  try {
    const messagesCollection = collection(db, "chats");
    await addDoc(messagesCollection, {
      text: message,
      sender: user!.uid,
      timestamp: Date.now(),
      to: id,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}
