import { ChatRoom, Chat } from "../models";

export const removeRoom = async (roomId: string) => {
  try {
    await ChatRoom.destroy({ where: { roomId: roomId } });
    await Chat.destroy({ where: { ChatRoomRoomId: roomId } });
  } catch (err) {
    console.log(err);
  }
};
