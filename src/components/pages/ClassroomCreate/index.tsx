import { Link, useNavigate } from "react-router";
import { ClassroomCreateSchema } from "../../../services/classrooms.service";
import { useCreateClassroom } from "../../../store/classrooms.store";
import * as S from "./style";
import { SideBarTemplate } from "../../templates/SideBarTemplate";
import { Title } from "../../ions";
import { Button, Form } from "antd";
import { InputForm } from "../../molecules/InputForm";
import { SelectForm } from "../../molecules/SelectForm";
import { useListStudents } from "../../../store/students.store";
import { useState } from "react";

export function ClassroomCreate() {
  const navigator = useNavigate();
  const [searchStudents, setSearchStudents] = useState<string | undefined>();
  const { data: students } = useListStudents(1, 5, searchStudents);
  const { mutate } = useCreateClassroom({
    onSuccess: () => navigator("/classrooms"),
  });
  //   const [studentsSelected, setStudentsSelected] = useState<TransferKey[]>([]);
  //   const [otherStudents, setOtherStudents] = useState<TransferKey[]>([]);

  //   const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
  //     setOtherStudents(nextTargetKeys);
  //   };

  //   const onSelectChange: TransferProps["onSelectChange"] = (
  //     sourceSelectedKeys,
  //     targetSelectedKeys
  //   ) => {
  //     setStudentsSelected([...sourceSelectedKeys, ...targetSelectedKeys]);
  //   };

  const onSearchStudents = (value: string) => {
    setSearchStudents(value === "" ? undefined : value);
  };
  const onFinish = (values: ClassroomCreateSchema) => {
    mutate(values);
  };

  //   useEffect(() => {
  //     setOtherStudents(
  //       students ? students?.results.map((student) => student.id) : []
  //     );
  //   }, [students]);

  return (
    <SideBarTemplate>
      <S.FormContainer>
        <Title>Cadastro de Turma</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <S.Row>
            <InputForm
              label="Nome"
              name="name"
              rules={[{ required: true, message: "O nome é obrigatório!" }]}
            />
            <SelectForm
              label="Turno"
              name="shift"
              rules={[{ required: true, message: "O turno é obrigatório!" }]}
              options={[
                { label: "Manhã", value: "MORNING" },
                { label: "Tarde", value: "AFTERNOON" },
                { label: "Noite", value: "NIGHT" },
              ]}
            />
          </S.Row>
          <SelectForm
            label="Alunos"
            name="students_ids"
            onSearch={onSearchStudents}
            mode="multiple"
            options={students?.results.map((student) => ({
              label: student.fullname,
              value: student.id,
            }))}
          />
          {/* <Form.Item label="Estudantes" name="students_ids">
            <Transfer
              titles={["Aluno da turma", "todos Alunos"]}
              targetKeys={otherStudents}
              selectedKeys={studentsSelected}
              onChange={onChange}
              onSelectChange={onSelectChange}
              dataSource={students?.results.map((student) => ({
                key: student.id,
                title: student.fullname,
                description: student.responsible,
              }))}
              render={(item) => item.title}
            />
          </Form.Item> */}

          <S.ContainerButtons>
            <Link to="/classrooms">
              <Button>Cancelar</Button>
            </Link>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
          </S.ContainerButtons>
        </Form>
      </S.FormContainer>
    </SideBarTemplate>
  );
}
