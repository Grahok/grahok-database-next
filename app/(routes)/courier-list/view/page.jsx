"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import courierNames from "@/constants/courierNames";
import DistrictsCombobox from "@/features/courier-list/DistrictsCombobox";
import DivisionsCombobox from "@/features/courier-list/DivisionsCombobox";
import UpazillasCombobox from "@/features/courier-list/UpazillasCombobox";
import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewCourierInfo() {
  const [selectedCourier, setSelectedCourier] = useState();
  const [courierInfo, setCourierInfo] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedUpazilla, setSelectedUpazilla] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/courierInfo?courierName=${selectedCourier || ""}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const { courierInfo } = await response.json();

        setCourierInfo(courierInfo || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedCourier]);

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
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">View Courier Info</h1>
      <div>
        <form className="flex items-end gap-6">
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
          {!!selectedCourier && (
            <>
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
              <div className="flex gap-3">
                <Button type="submit">Submit</Button>
                <Button variant="outline">
                  <RefreshCwIcon />
                  Refresh
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              <TableHead>Courier Name</TableHead>
              <TableHead>Branch Name</TableHead>
              <TableHead>Branch Id</TableHead>
              <TableHead>Branch Code</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courierInfo.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.courierName}</TableCell>
                <TableCell>{item.branchName}</TableCell>
                <TableCell>{item.branchId}</TableCell>
                <TableCell>{item.branchCode}</TableCell>
                <TableCell>{item.address.location}</TableCell>
                <TableCell>{item.mobileNumber}</TableCell>
                <TableCell>{item.courierCondition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </section>
  );
}
