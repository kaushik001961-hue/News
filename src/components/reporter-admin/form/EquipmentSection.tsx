"use client";

interface Props {
  formData:any;
  updateField:(name:string,value:any)=>void;
}

export default function EquipmentSection({
  formData,
  updateField,
}:Props){

const Checkbox = ({
label,
field,
}:{
label:string;
field:string;
})=>(
<label className="flex items-center gap-3">
<input
type="checkbox"
checked={formData[field]}
onChange={(e)=>updateField(field,e.target.checked)}
/>
<span>{label}</span>
</label>
);

return(

<div className="rounded-3xl border bg-white p-8 shadow-lg">

<h2 className="mb-6 text-2xl font-bold">
Equipment
</h2>

<div className="grid gap-5 md:grid-cols-2">

<Checkbox label="Camera" field="hasCamera"/>

<Checkbox label="Laptop" field="hasLaptop"/>

<Checkbox label="Vehicle" field="hasVehicle"/>

<Checkbox label="Driving License" field="drivingLicense"/>

</div>

</div>

);
}