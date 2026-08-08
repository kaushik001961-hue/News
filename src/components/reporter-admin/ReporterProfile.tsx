"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Globe,
  Phone,
  Briefcase,
  GraduationCap,
  User,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Pencil,
  BadgeCheck,
} from "lucide-react";

import ReporterStatusBadge from "./ReporterStatusBadge";
import ReporterDocuments from "./ReporterDocuments";
import ReporterTimeline from "./ReporterTimeline";
import ReporterActions from "./ReporterActions";

interface ReporterActivity {
  id: string;

  action: string;

  title: string;

  description?: string | null;

  performedBy?: string | null;

  remarks?: string | null;

  createdAt: string;
}

interface Reporter {
  id: string;

  reporterId: string | null;
  applicationNo?: string | null;

  firstName: string;
  middleName?: string | null;
  lastName: string;

  gender?: string | null;
  dob?: string | null;

  email: string;
  phone: string;

  district?: string | null;
  state?: string | null;

  status: string;

  photo?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;

  approvedAt?: string | null;
  rejectedAt?: string | null;
  blockedAt?: string | null;

  pressCard?: string | null;

  college?: string | null;
  university?: string | null;
  passingYear?: string | null;
  languages?: string | null;

  designation?: string | null;
  experience?: number | null;
  currentOrganization?: string | null;
  previousOrganization?: string | null;

  beat?: string | null;
  coverageArea?: string | null;

  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  website?: string | null;

  emergencyName?: string | null;
  emergencyRelation?: string | null;
  emergencyPhone?: string | null;

  remarks?: string | null;
  activities: ReporterActivity[];
}

interface ReporterProfileProps {
  reporter: Reporter;
}

export default function ReporterProfile({
  reporter,
}: ReporterProfileProps) {

  console.log("Reporter Prisma ID:", reporter.id);
  console.log("Reporter Display ID:", reporter.reporterId);

  return (

    <div className="space-y-8">

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shadow-xl">

        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-6">

            {reporter.photo ? (

              <Image
                src={
                  reporter.photo.startsWith("/")
                    ? reporter.photo
                    : `/${reporter.photo}`
                }
                alt={reporter.firstName}
                width={130}
                height={130}
                className="rounded-full border-4 border-white object-cover shadow-xl"
              />

            ) : (

              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-5xl font-bold">

                {reporter.firstName.charAt(0)}
                {reporter.lastName.charAt(0)}

              </div>

            )}

            <div>

              <h1 className="text-4xl font-bold">

                {reporter.firstName}{" "}
                {reporter.middleName}{" "}
                {reporter.lastName}

              </h1>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/20 px-4 py-2 text-sm">

                  Reporter ID :
                  {" "}
                  {reporter.reporterId ?? "-"}

                </span>

                {reporter.applicationNo && (

                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm">

                    Application :
                    {" "}
                    {reporter.applicationNo}

                  </span>

                )}

              </div>

              <div className="mt-5 flex flex-wrap gap-5 text-sm text-blue-100">

                <div className="flex items-center gap-2">

                  <Mail size={16} />

                  {reporter.email}

                </div>

                <div className="flex items-center gap-2">

                  <Phone size={16} />

                  {reporter.phone}

                </div>

                <div className="flex items-center gap-2">

                  <MapPin size={16} />

                  {reporter.district},{" "}
                  {reporter.state}

                </div>

              </div>

            </div>

          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">

            <ReporterStatusBadge
              status={reporter.status as any}
            />

            <div className="flex flex-wrap gap-3">

              <Link
                href={`/admin/reporters/${reporter.id}/edit`}
                className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-slate-100"
              >

                <Pencil
                  size={18}
                  className="mr-2 inline"
                />

                Edit Reporter

              </Link>

              {reporter.status === "APPROVED" && (

                <Link
                  href={`/admin/reporters/${reporter.id}/id-card`}
                  className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
                >

                  <CreditCard
                    size={18}
                    className="mr-2 inline"
                  />

                  Reporter ID Card

                </Link>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* OVERVIEW CARDS */}
      {/* ========================================================= */}

      <div className="grid gap-6 lg:grid-cols-4">

        <InfoCard
          title="Personal Information"
          icon={<User size={20} />}
        >
          <div className="space-y-4">

            <InfoRow
              label="Full Name"
              value={`${reporter.firstName} ${reporter.middleName ?? ""} ${reporter.lastName}`}
            />

            <InfoRow
              label="Gender"
              value={reporter.gender}
            />

            <InfoRow
              label="Date of Birth"
              value={reporter.dob}
            />

            <InfoRow
              label="Current Status"
              value={reporter.status}
            />

          </div>
        </InfoCard>

        <InfoCard
          title="Contact Information"
          icon={<Phone size={20} />}
        >
          <div className="space-y-4">

            <InfoRow
              label="Mobile Number"
              value={reporter.phone}
            />

            <InfoRow
              label="Email Address"
              value={reporter.email}
            />

            <InfoRow
              label="District"
              value={reporter.district}
            />

            <InfoRow
              label="State"
              value={reporter.state}
            />

          </div>
        </InfoCard>

        <InfoCard
          title="Reporter Details"
          icon={<BadgeCheck size={20} />}
        >
          <div className="space-y-4">

            <InfoRow
              label="Reporter ID"
              value={reporter.reporterId}
            />

            <InfoRow
              label="Application Number"
              value={reporter.applicationNo}
            />

            <InfoRow
              label="Designation"
              value={reporter.designation}
            />

            <InfoRow
              label="Experience"
              value={
                reporter.experience
                  ? `${reporter.experience} Years`
                  : "-"
              }
            />

          </div>
        </InfoCard>

        <InfoCard
          title="Registration"
          icon={<Calendar size={20} />}
        >
          <div className="space-y-4">

            <InfoRow
              label="Registered On"
              value={
                reporter.createdAt
                  ? new Date(
                      reporter.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />

            <InfoRow
              label="Last Updated"
              value={
                reporter.updatedAt
                  ? new Date(
                      reporter.updatedAt
                    ).toLocaleDateString()
                  : "-"
              }
            />

            <InfoRow
              label="Beat"
              value={reporter.beat}
            />

            <InfoRow
              label="Coverage Area"
              value={reporter.coverageArea}
            />

          </div>
        </InfoCard>

      </div>

      {/* ========================================================= */}
      {/* EDUCATION */}
      {/* ========================================================= */}

      <InfoCard
        title="Education & Credentials"
        icon={<GraduationCap size={20} />}
      >

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <InfoRow
            label="College"
            value={reporter.college}
          />

          <InfoRow
            label="University"
            value={reporter.university}
          />

          <InfoRow
            label="Passing Year"
            value={reporter.passingYear}
          />

          <InfoRow
            label="Languages"
            value={reporter.languages}
          />

        </div>

      </InfoCard>

      {/* ========================================================= */}
      {/* EXPERIENCE */}
      {/* ========================================================= */}

      <InfoCard
        title="Journalism Experience"
        icon={<Briefcase size={20} />}
      >

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <InfoRow
            label="Designation"
            value={reporter.designation}
          />

          <InfoRow
            label="Experience"
            value={
              reporter.experience
                ? `${reporter.experience} Years`
                : "-"
            }
          />

          <InfoRow
            label="Current Organization"
            value={reporter.currentOrganization}
          />

          <InfoRow
            label="Previous Organization"
            value={reporter.previousOrganization}
          />

          <InfoRow
            label="Reporting Beat"
            value={reporter.beat}
          />

          <InfoRow
            label="Coverage Area"
            value={reporter.coverageArea}
          />

        </div>

      </InfoCard>

      {/* ========================================================= */}
      {/* SOCIAL MEDIA */}
      {/* ========================================================= */}

      <InfoCard
        title="Social Media"
        icon={<Globe size={20} />}
      >

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <InfoRow
            label="Facebook"
            value={reporter.facebook}
          />

          <InfoRow
            label="Instagram"
            value={reporter.instagram}
          />

          <InfoRow
            label="Twitter / X"
            value={reporter.twitter}
          />

          <InfoRow
            label="LinkedIn"
            value={reporter.linkedin}
          />

          <InfoRow
            label="YouTube"
            value={reporter.youtube}
          />

          <InfoRow
            label="Website"
            value={reporter.website}
          />

        </div>

      </InfoCard>

      {/* ========================================================= */}
      {/* EMERGENCY CONTACT */}
      {/* ========================================================= */}

      <InfoCard
        title="Emergency Contact"
        icon={<Phone size={20} />}
      >

        <div className="grid gap-6 md:grid-cols-3">

          <InfoRow
            label="Contact Person"
            value={reporter.emergencyName}
          />

          <InfoRow
            label="Relationship"
            value={reporter.emergencyRelation}
          />

          <InfoRow
            label="Mobile Number"
            value={reporter.emergencyPhone}
          />

        </div>

      </InfoCard>

      {/* ========================================================= */}
      {/* DOCUMENTS */}
      {/* ========================================================= */}

      <ReporterDocuments
        reporter={reporter as any}
      />

      {/* ========================================================= */}
      {/* TIMELINE */}
      {/* ========================================================= */}

      <ReporterTimeline
        reporter={reporter as any}
      />

      {/* ========================================================= */}
      {/* ADMIN ACTIONS */}
      {/* ========================================================= */}

      <ReporterActions
        reporterId={reporter.id}
        status={reporter.status as any}
        onApprove={async () => {}}
        onReject={async () => {}}
        onSuspend={async () => {}}
        onDelete={async () => {}}
      />

      {/* ========================================================= */}
      {/* ADMIN REMARKS */}
      {/* ========================================================= */}

      <InfoCard
        title="Administrator Remarks"
      >

        <div className="rounded-xl bg-slate-50 p-5">

          <p className="leading-7 text-slate-700">

            {reporter.remarks
              ? reporter.remarks
              : "No administrator remarks available."}

          </p>

        </div>

      </InfoCard>

    </div>

  );

}

// =========================================================
// REUSABLE COMPONENTS
// =========================================================

interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

function InfoCard({
  title,
  icon,
  children,
}: InfoCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            {icon}
          </div>
        )}

        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

      </div>

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}

interface InfoRowProps {
  label: string;
  value?: string | number | null;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "-"
      : value;

  return (
    <div className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">

      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">

        {label}

      </div>

      <div className="mt-2 break-words text-base font-medium text-slate-800">

        {displayValue}

      </div>

    </div>
  );
}