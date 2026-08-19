import pool from "../config/db";

export const createGameRecord = async (
  roomId: string,
  circleUserId: number,
) => {
  const result = await pool.query(
    `INSERT INTO games (room_id, circle_user_id)
     VALUES ($1, $2)
     RETURNING id, room_id, circle_user_id, cross_user_id, winner, status, created_at`,
    [roomId, circleUserId],
  );

  return result.rows[0];
};