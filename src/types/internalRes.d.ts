export type InternalRes = 
  | { status: true, data: any, message: string }
  | { status: false, error: Error }
