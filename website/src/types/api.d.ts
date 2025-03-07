export interface ResultType<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
export interface ResultNotDataType {
  success: boolean;
  message?: string;
  error?: string;
}
