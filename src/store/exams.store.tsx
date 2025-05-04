import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createExam,
  deleteExam,
  examsPagination,
  ExamUpdateSchema,
  getExam,
  ScoreUpdateSchema,
  updateExam,
  updateScore,
} from "../services/exams.service";
import { UseMutateProps } from "./interfaces";

export function useListExams(
  page: number,
  size: number,
  disciplineId?: string
) {
  return useQuery({
    queryKey: ["exams", page, size, disciplineId],
    queryFn: () => examsPagination(disciplineId, page, size),
    placeholderData: keepPreviousData,
  });
}

export function useFindExam(id: string) {
  return useQuery({
    queryKey: ["exams", id],
    queryFn: () => getExam(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateExam({ onSuccess, onError }: UseMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExam,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["exams"] });
      if (onSuccess) {
        onSuccess();
      }
      // message.success('Atualizado com sucesso')
    },
    onError,
  });
}

export function useEditExam(
  id: string,
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (exam: ExamUpdateSchema) => updateExam(id, exam),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["exams", id] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useEditScore(
  { onSuccess, onError }: UseMutateProps = {}
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (score: ScoreUpdateSchema & {id: string}) => updateScore(score.id, score),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["exams"] });
      // message.success('Atualizado com sucesso')
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExam,
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ["exams"] });
    },
  });
}
