import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModal = ({
  type,
  userId,
  patientId,
  appointment,
}: {
  type: "schedule" | "cancel";
  userId: string;
  patientId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`capitalize ${
              type === "schedule"
                ? " text-green-500"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            {type === "schedule" ? "schedule" : "cancel"}
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">
              {type === "schedule" ? (
                <span className="text-green-500">Schedule</span>
              ) : (
                <span className="text-red-500">Cancel</span>
              )}
              {"  "}
              appointment
            </DialogTitle>
            <DialogDescription>
              Please fill in the following details to {type} an appointment.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            type={type}
            userId={userId}
            patientId={patientId}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentModal;
