"use client";

import React from "react";
import { Input, Button, Select } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Option } = Select;

const Home = () => {
  return (
    <div>
      {/* Sección principal con imagen de fondo */}
      <section
        style={{
          position: "relative",
          backgroundImage: `url('/assets/home/1.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "813px", 
          width: "100vw", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start", 
        }}
      >
      
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 600, 
            paddingLeft: "clamp(20px, 5vw, 80px)", 
            paddingRight: "20px", 
            color: 'black',
          }}
        >
          <h1 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 24, color: 'black' }}>
            Entrega de pedidos cerca de ti
          </h1>

          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Input
              size="large"
              placeholder="Ingresa la dirección de entrega"
              prefix={<EnvironmentOutlined style={{ color: '#000' }} />}
              style={{
                flex: 1,
                minWidth: '200px',
                backgroundColor: 'white',
                border: '1px solid #d9d9d9',
                borderRadius: '6px', 
              }}
            />

            <Select
              size="large"
              defaultValue="ahora"
              style={{
                width: 150,
                backgroundColor: 'white',
                border: '1px solid #d9d9d9',
                borderRadius: '6px', 
                color: 'black',
              }}
            >
              <Option value="ahora">Entregar ahora</Option>
              <Option value="programado">Entregar programado</Option>
            </Select>

            <Button
              type="primary"
              size="large"
              style={{ 
                color: 'white', 
                borderRadius: '6px', 
              }}
            >
              Buscar comida
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;