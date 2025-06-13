"use client";

import { useEffect, useMemo } from "react";
import Modal from "@src/components/modal";
import { useRouter, useSearchParams } from "next/navigation";
import CachedImage from "@src/components/cachedImage";
import { logoUrl } from "@src/utils/constants";
import DynamicForm from "../dynamicForm";
import { useDynamicForm } from "@src/context/dynamicForm";

const RegisterModal = () => {
  const { form, saving, setOpen } = useDynamicForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const signupParam = searchParams.get("signup");

  const open = useMemo(() => {
    return signupParam === "true";
  }, [signupParam]);

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);

  return (
    <Modal
      open={open}
      okText="Sign up"
      onCancel={() => router.push("/")}
      onClose={() => router.push("/")}
      okButtonProps={{
        loading: saving,
      }}
      onOk={() => form.submit()}
    >
      <div style={{
        width: "100%",
        height: "100%",
      }}>
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CachedImage
            imageUrl={logoUrl}
            alt="Logo TODO CONSTRUCTION LLC"
            style={{ height: 140, width: 160, objectFit: "cover" }}
          />
          <h3>SIGN UP TO TODO CONSTRUCTION LLC</h3>
          <DynamicForm />
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;