import { NotificationInstance } from "antd/es/notification/interface";

export interface UseMutateProps {
  onSuccess?: () => void;
  onError?: () => void;
  notification?: NotificationInstance;
}
