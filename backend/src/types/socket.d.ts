export {};

declare module "socket.io" {
  interface Socket {
    userId: number;
  }
}
