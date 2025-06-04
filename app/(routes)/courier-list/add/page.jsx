"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import courierConditions from "@/constants/courierConditions";
import courierNames from "@/constants/courierNames";
import DistrictsCombobox from "@/features/courier-list/DistrictsCombobox";
import DivisionsCombobox from "@/features/courier-list/DivisionsCombobox";
import UpazillasCombobox from "@/features/courier-list/UpazillasCombobox";
import { useEffect, useState } from "react";

export default function AddCourierInfo() {
  const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedCourierContition, setSelectedCourierCondition] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedUpazilla, setSelectedUpazilla] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://bdapi.vercel.app/api/v.1/division",
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const divisions = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setDivisions(divisions);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedDivision) return; // Only fetch if a division is selected
    (async () => {
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/district/${selectedDivision.id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const districts = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setDistricts(districts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedDivision]);

  useEffect(() => {
    if (!selectedDistrict) return; // Only fetch if a district is selected
    (async () => {
      try {
        const response = await fetch(
          `https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict.id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          }
        );
        const { data } = await response.json();
        const upazillas = data.map((datum) => ({
          id: datum.id,
          label: datum.name,
          value: datum.name,
        }));

        setUpazillas(upazillas);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedDistrict]);

  async function addCourierInfo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {
      courierName: formData.get("courierName"),
      courierCondition: formData.get("courierCondition"),
      address: {
        division: formData.get("division"),
        district: formData.get("district"),
        upazilla: formData.get("upazilla"),
        location: formData.get("location"),
      },
      branchName: formData.get("branchName"),
      branchCode: formData.get("branchCode"),
      branchId: formData.get("branchId"),
      mobileNumber: formData.get("mobileNumber"),
    };
    console.log(formDataObject)
    try {
      const reponse = await fetch("/api/courierInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObject),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold">Add Courier Info</h1>
      </header>
      <form className="flex flex-col gap-6 max-w-3xl" onSubmit={addCourierInfo}>
        <section className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="courierName">Courier Name</Label>
              <Select
                id="courierName"
                name="courierName"
                value={selectedCourier}
                onValueChange={(value) => {
                  setSelectedCourier(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Courier Name" />
                </SelectTrigger>
                <SelectContent>
                  {courierNames.map((courier, index) => (
                    <SelectItem key={index} value={courier.value}>
                      {courier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="courierCondition">Courier Condition</Label>
              <Select
                id="courierCondition"
                name="courierCondition"
                value={selectedCourierContition}
                onValueChange={(value) => {
                  setSelectedCourierCondition(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Courier Condition" />
                </SelectTrigger>
                <SelectContent>
                  {courierConditions.map((condition, index) => (
                    <SelectItem key={index} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-6">
            <DivisionsCombobox
              divisions={divisions}
              onDivisionSelect={(division) => setSelectedDivision(division)}
            />
            <input
              type="hidden"
              name="division"
              value={selectedDivision.value || ""}
            />
            <DistrictsCombobox
              districts={districts}
              onDistrictSelect={(district) => setSelectedDistrict(district)}
            />
            <input
              type="hidden"
              name="district"
              value={selectedDistrict.value || ""}
            />
            <UpazillasCombobox
              upazillas={upazillas}
              onUpazillaSelect={(upazilla) => setSelectedUpazilla(upazilla)}
            />
            <input
              type="hidden"
              name="upazilla"
              value={selectedUpazilla.value || ""}
            />
          </div>
        </section>
        <section className="flex gap-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="branchName">Branch Name</Label>
            <Input type="text" id="branchName" name="branchName" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input type="text" id="branchCode" name="branchCode" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="branchId">Branch Id</Label>
            <Input type="text" id="branchId" name="branchId" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input type="text" id="mobileNumber" name="mobileNumber" />
          </div>
        </section>
        <div className="flex flex-col gap-1">
          <Label htmlFor="location">Location</Label>
          <Textarea id="location" name="location" required />
        </div>
        <Button type="submit" className="self-start">
          Add Info
        </Button>
      </form>
    </section>
  );
}
