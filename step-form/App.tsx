/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import Select from "react-select/creatable";
import * as yup from "yup";

interface InterestOption {
  label: string;
  value: string;
}
interface EmploymentOption {
  label: string;
  value: string;
}

interface WorkExperience {
  company: string;
  role: string;
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interests: InterestOption[];
  employment: EmploymentOption | null;
  workExperience: WorkExperience[];
}

const interests: InterestOption[] = [
  { value: "programming", label: "Программирование" },
  { value: "design", label: "Дизайн" },
  { value: "marketing", label: "Маркетинг" },
  { value: "music", label: "Музыка" },
];

const employment: EmploymentOption[] = [
  { value: "full-time", label: "Полная занятость" },
  { value: "part-time", label: "Частичная занятость" },
  { value: "freelance", label: "Фриланс" },
];

const firstSchema = yup.object({
  firstName: yup.string().required("Укажите имя"),
  lastName: yup.string().required("Укажите фамилию"),
});
const secondSchema = yup.object({
  workExperience: yup.array().of(
    yup.object({
      company: yup.string().required("Укажите компанию"),
      role: yup.string().required("Укажите должность"),
    })
  ),
  interests: yup.array().min(1, "Выберите хотя бы один интерес"),
  employment: yup
    .object()
    .shape({
      value: yup.string().required("Выберите тип занятости"),
      label: yup.string().required("Выберите тип занятости"),
    })
    .required("Выберите тип занятости"),
});

const thirdSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Укажите email"),
  password: yup.string().required("Укажите пароль"),
});

const steps = [
  { name: "Личные данные", schema: firstSchema },
  { name: "Опыт работы и интересы", schema: secondSchema },
  { name: "Авторизация", schema: thirdSchema },
];

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(steps[currentStep].schema) as any,
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      interests: [],
      employment: null,
      workExperience: [{ company: "", role: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const onSubmit = (data: FormValues) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(data);
    }
  };
  return (
    <div className="container mx-auto px-4 pt-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Многошаговая форма
        </h2>
        <p className="text-center text-gray-700 mb-6">
          {steps[currentStep].name}
        </p>
        {currentStep === 0 && (
          <div id="step-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Имя
            </label>

            <input
              {...register("firstName")}
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Фамилия
            </label>
            <input
              {...register("lastName")}
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        )}
        {currentStep === 1 && (
          <div id="step-2">
            <h3 className="text-lg font-bold mb-2">Опыт работы</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 border-b pb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field.company}
                >
                  Компания
                </label>
                <input
                  {...register(`workExperience.${index}.company`)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                {errors.workExperience?.[index]?.company && (
                  <p className="text-red-500 text-sm">
                    {errors.workExperience?.[index]?.company?.message}
                  </p>
                )}

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field.role}
                >
                  Должность
                </label>
                <input
                  {...register(`workExperience.${index}.role`)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                {errors.workExperience?.[index]?.role && (
                  <p className="text-red-500 text-sm">
                    {errors.workExperience?.[index]?.role?.message}
                  </p>
                )}
                <button
                  type="button"
                  className="bg-red-500  hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => remove(index)}
                >
                  Удалить опыт
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4"
              onClick={() => append({ company: "", role: "" })}
            >
              Добавить опыт
            </button>

            <h3 className="text-lg font-bold mb-2">Интересы</h3>
            <Controller
              control={control}
              name="interests"
              render={({ field, fieldState }) => {
                return (
                  <>
                    {" "}
                    <Select
                      isMulti
                      options={interests}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Выберите интересы"
                      className="mb-2"
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
            <h3 className="text-lg font-bold mb-2">Тип занятости</h3>
            <Controller
              control={control}
              name="employment"
              render={({ field, fieldState }) => {
                return (
                  <>
                    {" "}
                    <Select
                      options={employment}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Выберите тип занятости"
                      className="mb-2"
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div id="step-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              email
            </label>

            <input
              {...register("email")}
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              пароль
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6 gap-6">
          {currentStep > 0 && (
            <button
              type="button"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Назад
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          >
            {currentStep === steps.length - 1 ? "Отправить" : "Далее"}
          </button>
        </div>
      </form>
    </div>
  );
};
