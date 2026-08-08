"use client";

import { useState } from "react";

import PersonalSection from "./PersonalSection";
import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import EquipmentSection from "./EquipmentSection";
import SocialSection from "./SocialSection";
import DocumentsSection from "./DocumentsSection";
import FormActions from "./FormActions";

interface Props {
  initialData: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function ReporterForm({
  initialData,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  function updateField(name: string, value: any) {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      <PersonalSection
        formData={formData}
        updateField={updateField}
      />

      <ContactSection
        formData={formData}
        updateField={updateField}
      />

      <AddressSection
        formData={formData}
        updateField={updateField}
      />

      <EducationSection
        formData={formData}
        updateField={updateField}
      />

      <ExperienceSection
        formData={formData}
        updateField={updateField}
      />

      <EquipmentSection
        formData={formData}
        updateField={updateField}
      />

      <SocialSection
        formData={formData}
        updateField={updateField}
      />

      <DocumentsSection
        formData={formData}
        updateField={updateField}
      />

      <FormActions
        loading={loading}
      />

    </form>
  );
}