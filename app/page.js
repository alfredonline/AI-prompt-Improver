"use client";
import Robot from "../assets/robot.png";
import Image from "next/image";
import Input from "../components/Input";
import ImprovedPrompt from "../components/ImprovedPrompt";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [userPrompt, setUserPrompt] = useState("");
  const [improvedPrompts, setImprovedPrompts] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      if (userPrompt === "") return;
      const { data } = await axios.post("/api/convertPrompt", {
        prompt: userPrompt,
      });


      if (data?.prompt?.choices[0]?.message?.content === "no prompt") {
        setError("No prompt was detected. Please try again.");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      const uniqueId = Math.random().toString(36).substring(7);

      localStorage.setItem(
        "improvedPrompts",
        JSON.stringify([
          ...improvedPrompts,
          {
            ogPrompt: userPrompt,
            improvedPrompt: data?.prompt?.choices[0]?.message?.content,
            id: uniqueId,
          },
        ])
      );

      setImprovedPrompts([
        ...improvedPrompts,
        {
          ogPrompt: userPrompt,
          improvedPrompt: data?.prompt?.choices[0]?.message?.content,
          id: uniqueId,
        },
      ]);

      setUserPrompt("");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleDelete = (id) => {
    const filteredPrompts = improvedPrompts.filter(
      (prompt) => prompt.id !== id
    );
    setImprovedPrompts(filteredPrompts);
    localStorage.setItem("improvedPrompts", JSON.stringify(filteredPrompts));
  };

  useEffect(() => {
    setImprovedPrompts(
      JSON.parse(localStorage.getItem("improvedPrompts")) || []
    );
    getData();
  }, []);

  return (
    <main className="flex flex-col items-center h-screen mt-6">
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md">{error}</div>
      )}
      <Image
        src={Robot}
        alt="Robot"
        className="inline-block"
        width={50}
        height={50}
      />
      <h1 className="text-5xl text-center header mt-5">Improve My Prompt </h1>
      <Input
        handleSubmit={getData}
        setUserPrompt={setUserPrompt}
        userPrompt={userPrompt}
      />
      {
        <div
          className="flex flex-col items-center mt-5"
          style={{
            gap: "1rem",
          }}
        >
          {improvedPrompts.map(({ ogPrompt, improvedPrompt, id }, index) => (
            <ImprovedPrompt
              key={index}
              ogPrompt={ogPrompt}
              improvedPrompt={improvedPrompt}
              handleDelete={() => handleDelete(id)}
            />
          ))}
        </div>
      }
    </main>
  );
}
