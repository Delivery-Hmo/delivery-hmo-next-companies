"use client";

import DynamicFormProvider from "@src/context/dynamicForm";
import { message } from "antd";
import { Form } from "./form";
import { Schedule } from "@src/interfaces/landingPage";
import { ruleName } from "@src/utils/constants";
import dayjs, { Dayjs } from "dayjs";
import SubmitButton from "./submitButton";

const EmailForm = () => {
  return (
    <DynamicFormProvider<Schedule>
      requestFun={async (values, form) => {
        try {
          const res = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...values,
              dateTime: (values.dateTime as Dayjs).format('MM/DD/YYYY HH:mm:ss a'),
            }),
          });

          const data = await res.json();

          if (!data.success) {
            message.error('Error sending email.');
            return;
          }

          message.success('Schedule sent successfully.');
          form.resetFields();
        } catch (err) {
          console.error(err);
          message.error('Error sending email.');
        }
      }}
      openProp
      inputsProp={[
        {
          name: "name",
          label: "Full name",
          rules: [ruleName],
          md: 4,
        },
        {
          name: "phone",
          label: "Phone",
          type: "phone",
          md: 4,
        },
        {
          name: "service",
          label: "Handyman service",
          type: "select",
          options: [
            { label: "General", value: "general" },
            { label: "Remodeling", value: "remodeling" },
            { label: "Painting", value: "painting" },
            { label: "Stucco and plastering", value: "stucco and plastering" },
            { label: "Drywall", value: "drywall" },
            { label: "Roofing", value: "roofing" },
            { label: "Plumbing", value: "plumbing" },
            { label: "Electrical", value: "electrical" },
            { label: "HVAC", value: "hvac" },
            { label: "Carpentry", value: "carpentry" },
            { label: "Other", value: "other" },
          ],
          md: 4,
          rules: [{ required: true, message: "Please select a service" }],
        },
        {
          name: "dateTime",
          label: "Date",
          type: "dataTime",
          md: 4,
          showTime: true,
          rules: [{ required: true, message: "Please select a date" }],
          minDate: dayjs(),
        },
        {
          name: "images",
          label: "Photos of the issue",
          type: "image",
          md: 4,
          multiple: true,
        }
      ]}
      withOutToken
    >
      <Form />
      <SubmitButton />
    </DynamicFormProvider>
  );
};

export default EmailForm;