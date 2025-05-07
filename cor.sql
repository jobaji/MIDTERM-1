-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 09:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cor`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificate_of_registration`
--

CREATE TABLE `certificate_of_registration` (
  `registration_no` varchar(50) NOT NULL,
  `academic_year_term` varchar(50) DEFAULT NULL,
  `student_no` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` varchar(5) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `major` varchar(100) DEFAULT NULL,
  `year_level` varchar(20) DEFAULT NULL,
  `curriculum` varchar(100) DEFAULT NULL,
  `scholarship_discount` varchar(100) DEFAULT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `subject_title` varchar(100) DEFAULT NULL,
  `lec_units` varchar(5) DEFAULT NULL,
  `lab_units` varchar(5) DEFAULT NULL,
  `credit_units` varchar(5) DEFAULT NULL,
  `tuition_units` varchar(5) DEFAULT NULL,
  `subject_section` varchar(20) DEFAULT NULL,
  `subject_schedule_room` varchar(100) DEFAULT NULL,
  `subject_faculty` varchar(100) DEFAULT NULL,
  `total_lec_units` varchar(5) DEFAULT NULL,
  `total_lab_units` varchar(5) DEFAULT NULL,
  `total_credit_units` varchar(5) DEFAULT NULL,
  `total_tuition` varchar(5) DEFAULT NULL,
  `tuition` decimal(10,2) DEFAULT NULL,
  `athletic_fee` decimal(10,2) DEFAULT NULL,
  `cultural_fee` decimal(10,2) DEFAULT NULL,
  `development_fee` decimal(10,2) DEFAULT NULL,
  `guidance_fee` decimal(10,2) DEFAULT NULL,
  `library_fee` decimal(10,2) DEFAULT NULL,
  `medical_dental_fee` decimal(10,2) DEFAULT NULL,
  `registration_fee` decimal(10,2) DEFAULT NULL,
  `computer_fee` decimal(10,2) DEFAULT NULL,
  `laboratory_fee` decimal(10,2) DEFAULT NULL,
  `total_assessment` decimal(10,2) DEFAULT NULL,
  `less_financial_aid` decimal(10,2) DEFAULT NULL,
  `net_assessed` decimal(10,2) DEFAULT NULL,
  `credit_memo` decimal(10,2) DEFAULT NULL,
  `total_discount` decimal(10,2) DEFAULT NULL,
  `total_payment` decimal(10,2) DEFAULT NULL,
  `outstanding_balance` decimal(10,2) DEFAULT NULL,
  `first_payment_due` date DEFAULT NULL,
  `second_payment_due` date DEFAULT NULL,
  `third_payment_due` date DEFAULT NULL,
  `payment_validation_date` date DEFAULT NULL,
  `official_receipt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certificate_of_registration`
--

INSERT INTO `certificate_of_registration` (`registration_no`, `academic_year_term`, `student_no`, `name`, `gender`, `age`, `email_address`, `college`, `program`, `major`, `year_level`, `curriculum`, `scholarship_discount`, `subject_code`, `subject_title`, `lec_units`, `lab_units`, `credit_units`, `tuition_units`, `subject_section`, `subject_schedule_room`, `subject_faculty`, `total_lec_units`, `total_lab_units`, `total_credit_units`, `total_tuition`, `tuition`, `athletic_fee`, `cultural_fee`, `development_fee`, `guidance_fee`, `library_fee`, `medical_dental_fee`, `registration_fee`, `computer_fee`, `laboratory_fee`, `total_assessment`, `less_financial_aid`, `net_assessed`, `credit_memo`, `total_discount`, `total_payment`, `outstanding_balance`, `first_payment_due`, `second_payment_due`, `third_payment_due`, `payment_validation_date`, `official_receipt`) VALUES
('2147483647', 'Second Semester AY 2024-2025', '234-14491M', 'VERCELES, JESTIN JOHN DELA CRUZ', 'Male', '23', 'majorj0349@gmail.com', 'College of Computing Studies', 'Bachelor of Science in Information Technology', NULL, 'Third Year - Irregul', '2018-2019', 'UNIFAST-FHE', 'IAASLEC1', 'Information Assurance and Security 1 (Lecture)', '2', '0', '2', '2', 'BSINFOTECH 3C', 'TH 04:00PM-06:00PM', 'RUTAQUIO, LARRY', '24', '4', '28', '28', 2.00, 50.00, 50.00, 80.00, 30.00, 100.00, 130.00, 50.00, 500.00, 550.00, 4.00, 4.00, 0.00, 0.00, 0.00, 0.00, 0.00, '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', 'Scholar');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `employeeNumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(50) DEFAULT 'Student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `employeeNumber`, `password`, `roles`, `created_at`) VALUES
(1, 'Verceles', '1', '$2b$10$4JczQ6ZC0759ZPGblJFhrumg846md5c0dM2OcKQQ9rVcpsW6neNDK', 'Admin', '2025-04-30 04:41:00'),
(2, '2', '2', '$2b$10$.BhBj9V7FC7SsHd/96k3lOKRIi1gGF6eeQRDvE82ZK.FauTu09fEm', 'Admin', '2025-04-30 04:51:40'),
(3, '3', '3', '$2b$10$JAvU1PIs6U.xkfU.1M3gMuTDz.vhzVHYWWKYvHO18QgIHAl0LN1LG', 'Admin', '2025-04-30 07:46:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificate_of_registration`
--
ALTER TABLE `certificate_of_registration`
  ADD PRIMARY KEY (`registration_no`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `employeeNumber` (`employeeNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
