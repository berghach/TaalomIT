import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
// import { addUser } from "../../features/user/userApi";
import { User } from "../../models/auth";
import { Role } from "../../models/roles";

const userSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.mixed().oneOf(Object.values(Role), "Role is required").required("Role is required"),
    grade: yup.number().positive("Grade must be a positive number").required("Grade is required"),
    birthDate: yup.date().required("Birth date is required").nullable(),
    enrollementDate: yup.date().required("Enrollment date is required").nullable(),
});

const AddUser: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      await dispatch(addUser(data)); 
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user", error);
      alert("Failed to add user!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Role</label>
          <select {...register("role")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
            <option value="">Select a role</option>
            <option value={Role.TEACHER}>Teacher</option>
            <option value={Role.STUDENT}>Student</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Grade</label>
          <input
            type="number"
            {...register("grade")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Birth Date</label>
          <input
            type="date"
            {...register("birthDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Enrollment Date</label>
          <input
            type="date"
            {...register("enrollementDate")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.enrollementDate && <p className="text-red-500">{errors.enrollementDate.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
