export interface Region {
  id: string;
  name: string;
  nameUz: string;
  schoolCount: number;
  avgScore: number;
  topSchool: string;
  districtCount: number;
  color: string;
}

export interface School {
  id: string;
  name: string;
  regionId: string;
  regionName: string;
  district: string;
  director: string;
  studentCount: number;
  image: string;
  overallScore: number;
  nationalRank: number;
  regionRank: number;
  districtRank: number;
  status: 'active' | 'pending' | 'suspended';
  certificates: number;
  olimpiadScore: number;
  examAvg: number;
  attendance: number;
  teacherRating: number;
  monthlyTrend: number[];
  createdAt: string;
}

export interface Certificate {
  id: string;
  schoolId: string;
  title: string;
  category: 'olimpiad' | 'sport' | 'art' | 'science' | 'leadership';
  score: number;
  issuedTo: string;
  issuer: string;
  date: string;
  status: 'verified' | 'pending';
  fileUrl: string;
}

export interface User {
  id: string;
  name: string;
  lastName?: string;
  email?: string;
  username?: string;
  role: 'super_admin' | 'region_admin' | 'school_admin' | 'teacher' | 'student';
  sinf?: string;
  region?: string;
  district?: string;
  school?: string;
  createdAt: string;
  status: 'active' | 'suspended';
  lastLogin: string;
}

export const regions: Region[] = [
{ id: 'reg-01', name: 'Toshkent shahri', nameUz: 'Toshkent sh.', schoolCount: 487, avgScore: 84.2, topSchool: '1-sonli ixtisoslashtirilgan maktab', districtCount: 11, color: 'bg-blue-500' },
{ id: 'reg-02', name: 'Toshkent viloyati', nameUz: 'Toshkent v.', schoolCount: 412, avgScore: 78.6, topSchool: 'Chinoz 3-maktab', districtCount: 15, color: 'bg-indigo-500' },
{ id: 'reg-03', name: 'Samarqand viloyati', nameUz: 'Samarqand', schoolCount: 398, avgScore: 76.4, topSchool: 'Samarqand 14-maktab', districtCount: 14, color: 'bg-emerald-500' },
{ id: 'reg-04', name: 'Farg\'ona viloyati', nameUz: "Farg'ona", schoolCount: 441, avgScore: 75.8, topSchool: "Farg'ona 7-ixtisoslashtirilgan", districtCount: 15, color: 'bg-orange-500' },
{ id: 'reg-05', name: 'Andijon viloyati', nameUz: 'Andijon', schoolCount: 389, avgScore: 74.3, topSchool: 'Andijon 2-maktab', districtCount: 14, color: 'bg-rose-500' },
{ id: 'reg-06', name: 'Namangan viloyati', nameUz: 'Namangan', schoolCount: 356, avgScore: 73.1, topSchool: 'Namangan 5-maktab', districtCount: 12, color: 'bg-violet-500' },
{ id: 'reg-07', name: 'Qashqadaryo viloyati', nameUz: 'Qashqadaryo', schoolCount: 378, avgScore: 71.9, topSchool: 'Qarshi 1-maktab', districtCount: 14, color: 'bg-yellow-500' },
{ id: 'reg-08', name: 'Surxondaryo viloyati', nameUz: 'Surxondaryo', schoolCount: 312, avgScore: 70.4, topSchool: 'Termiz 8-maktab', districtCount: 13, color: 'bg-lime-500' },
{ id: 'reg-09', name: 'Buxoro viloyati', nameUz: 'Buxoro', schoolCount: 287, avgScore: 72.7, topSchool: 'Buxoro 3-maktab', districtCount: 11, color: 'bg-amber-500' },
{ id: 'reg-10', name: 'Xorazm viloyati', nameUz: 'Xorazm', schoolCount: 276, avgScore: 69.8, topSchool: 'Urganch 2-maktab', districtCount: 10, color: 'bg-teal-500' },
{ id: 'reg-11', name: 'Navoiy viloyati', nameUz: 'Navoiy', schoolCount: 198, avgScore: 71.2, topSchool: 'Navoiy 1-maktab', districtCount: 8, color: 'bg-cyan-500' },
{ id: 'reg-12', name: 'Jizzax viloyati', nameUz: 'Jizzax', schoolCount: 221, avgScore: 70.6, topSchool: 'Jizzax 4-maktab', districtCount: 12, color: 'bg-pink-500' },
{ id: 'reg-13', name: 'Sirdaryo viloyati', nameUz: 'Sirdaryo', schoolCount: 156, avgScore: 68.9, topSchool: 'Guliston 1-maktab', districtCount: 8, color: 'bg-fuchsia-500' },
{ id: 'reg-14', name: 'Qoraqalpog\'iston', nameUz: "Qoraqalpog'iston", schoolCount: 234, avgScore: 67.3, topSchool: "No'kis 5-maktab", districtCount: 14, color: 'bg-sky-500' }];


export const schools: School[] = [
{
  id: 'sch-001', name: '1-sonli ixtisoslashtirilgan maktab', regionId: 'reg-01',
  regionName: 'Toshkent shahri', district: 'Mirzo Ulug\'bek tumani', director: 'Azimov Behruz Salimovich',
  studentCount: 1240, image: "https://img.rocket.new/generatedImages/rocket_gen_img_11d023317-1767130130441.png",
  overallScore: 96.4, nationalRank: 1, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 48, olimpiadScore: 98, examAvg: 94, attendance: 97, teacherRating: 96,
  monthlyTrend: [88, 89, 91, 90, 93, 94, 93, 95, 96, 96, 97, 96],
  createdAt: '2020-09-01'
},
{
  id: 'sch-002', name: 'Mirzo Ulug\'bek nomidagi maktab', regionId: 'reg-01',
  regionName: 'Toshkent shahri', district: 'Yunusobod tumani', director: 'Rashidova Malika Hamidovna',
  studentCount: 980, image: "https://img.rocket.new/generatedImages/rocket_gen_img_142d3c9bf-1763301932985.png",
  overallScore: 94.1, nationalRank: 2, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 41, olimpiadScore: 95, examAvg: 92, attendance: 96, teacherRating: 93,
  monthlyTrend: [85, 87, 88, 89, 90, 91, 92, 92, 93, 94, 94, 94],
  createdAt: '2019-09-01'
},
{
  id: 'sch-001b', name: 'Toshkent 15-maktab', regionId: 'reg-01',
  regionName: 'Toshkent shahri', district: 'Chilonzor tumani', director: 'Sobirov Alisher Hamidovich',
  studentCount: 870, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b497b4e9-1772970038722.png",
  overallScore: 88.5, nationalRank: 13, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 29, olimpiadScore: 89, examAvg: 87, attendance: 90, teacherRating: 88,
  monthlyTrend: [80, 81, 83, 84, 85, 86, 87, 87, 88, 88, 89, 89],
  createdAt: '2021-09-01'
},
{
  id: 'sch-001c', name: 'Shayxontohur 8-maktab', regionId: 'reg-01',
  regionName: 'Toshkent shahri', district: 'Shayxontohur tumani', director: 'Normatova Zulfiya Karimovna',
  studentCount: 760, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1808937cb-1772539827056.png",
  overallScore: 83.7, nationalRank: 14, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 22, olimpiadScore: 84, examAvg: 83, attendance: 86, teacherRating: 82,
  monthlyTrend: [76, 77, 78, 79, 81, 82, 83, 83, 84, 84, 84, 84],
  createdAt: '2020-09-01'
},
{
  id: 'sch-001d', name: 'Uchtepa 12-maktab', regionId: 'reg-01',
  regionName: 'Toshkent shahri', district: 'Uchtepa tumani', director: 'Xoliqov Sardor Baxtiyorovich',
  studentCount: 690, image: "https://img.rocket.new/generatedImages/rocket_gen_img_122778d29-1776071972473.png",
  overallScore: 79.2, nationalRank: 18, regionRank: 5, districtRank: 1,
  status: 'active', certificates: 17, olimpiadScore: 80, examAvg: 78, attendance: 82, teacherRating: 79,
  monthlyTrend: [72, 73, 74, 75, 77, 78, 79, 79, 79, 79, 79, 79],
  createdAt: '2019-09-01'
},
{
  id: 'sch-009', name: 'Chinoz 3-maktab', regionId: 'reg-02',
  regionName: 'Toshkent viloyati', district: 'Chinoz tumani', director: 'Mirzayeva Gulnora Saidovna',
  studentCount: 680, image: "https://img.rocket.new/generatedImages/rocket_gen_img_18f0a7ecc-1772355318115.png",
  overallScore: 85.3, nationalRank: 9, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 22, olimpiadScore: 86, examAvg: 84, attendance: 89, teacherRating: 84,
  monthlyTrend: [71, 73, 74, 76, 78, 79, 81, 82, 84, 85, 85, 85],
  createdAt: '2018-09-01'
},
{
  id: 'sch-009b', name: 'Olmaliq 5-maktab', regionId: 'reg-02',
  regionName: 'Toshkent viloyati', district: 'Olmaliq shahri', director: 'Tursunov Jasur Aliyevich',
  studentCount: 720, image: "https://img.rocket.new/generatedImages/rocket_gen_img_142d3c9bf-1763301932985.png",
  overallScore: 81.4, nationalRank: 15, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 19, olimpiadScore: 82, examAvg: 80, attendance: 84, teacherRating: 81,
  monthlyTrend: [74, 75, 76, 77, 79, 80, 81, 81, 81, 81, 81, 81],
  createdAt: '2020-09-01'
},
{
  id: 'sch-009c', name: 'Angren 2-maktab', regionId: 'reg-02',
  regionName: 'Toshkent viloyati', district: 'Angren shahri', director: 'Qosimova Barno Hamidovna',
  studentCount: 610, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 77.8, nationalRank: 20, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 15, olimpiadScore: 78, examAvg: 77, attendance: 80, teacherRating: 77,
  monthlyTrend: [70, 71, 72, 73, 75, 76, 77, 77, 78, 78, 78, 78],
  createdAt: '2021-09-01'
},
{
  id: 'sch-009d', name: 'Bekobod 7-maktab', regionId: 'reg-02',
  regionName: 'Toshkent viloyati', district: 'Bekobod shahri', director: 'Nazarov Ulugbek Sobirov',
  studentCount: 540, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1df00b4f4-1765284588935.png",
  overallScore: 74.1, nationalRank: 24, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 12, olimpiadScore: 74, examAvg: 73, attendance: 77, teacherRating: 74,
  monthlyTrend: [67, 68, 69, 70, 72, 73, 74, 74, 74, 74, 74, 74],
  createdAt: '2019-09-01'
},
{
  id: 'sch-003', name: 'Samarqand 14-ixtisoslashtirilgan maktab', regionId: 'reg-03',
  regionName: 'Samarqand viloyati', district: 'Samarqand shahri', director: 'Toshmatov Jasur Normatovich',
  studentCount: 1120, image: "https://img.rocket.new/generatedImages/rocket_gen_img_113be2f93-1772212556327.png",
  overallScore: 92.8, nationalRank: 3, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 37, olimpiadScore: 94, examAvg: 91, attendance: 95, teacherRating: 91,
  monthlyTrend: [82, 84, 85, 87, 88, 89, 90, 91, 92, 92, 93, 93],
  createdAt: '2018-09-01'
},
{
  id: 'sch-003b', name: 'Samarqand 6-maktab', regionId: 'reg-03',
  regionName: 'Samarqand viloyati', district: 'Samarqand shahri', director: 'Yusupov Bahodir Toshmatovich',
  studentCount: 890, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac16929f-1772962975631.png",
  overallScore: 82.3, nationalRank: 16, regionRank: 2, districtRank: 2,
  status: 'active', certificates: 20, olimpiadScore: 83, examAvg: 81, attendance: 84, teacherRating: 82,
  monthlyTrend: [75, 76, 77, 78, 80, 81, 82, 82, 82, 82, 82, 83],
  createdAt: '2020-09-01'
},
{
  id: 'sch-003c', name: 'Urgut 3-maktab', regionId: 'reg-03',
  regionName: 'Samarqand viloyati', district: 'Urgut tumani', director: 'Holiqova Maftuna Aliyevna',
  studentCount: 670, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 76.9, nationalRank: 21, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 14, olimpiadScore: 77, examAvg: 76, attendance: 79, teacherRating: 76,
  monthlyTrend: [69, 70, 71, 72, 74, 75, 76, 76, 77, 77, 77, 77],
  createdAt: '2021-09-01'
},
{
  id: 'sch-003d', name: 'Kattaqo\'rg\'on 1-maktab', regionId: 'reg-03',
  regionName: 'Samarqand viloyati', district: 'Kattaqo\'rg\'on shahri', director: 'Ergashev Nodir Hamidovich',
  studentCount: 580, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 72.4, nationalRank: 26, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 11, olimpiadScore: 72, examAvg: 71, attendance: 75, teacherRating: 73,
  monthlyTrend: [65, 66, 67, 68, 70, 71, 72, 72, 72, 72, 72, 72],
  createdAt: '2019-09-01'
},
{
  id: 'sch-004', name: "Farg'ona 7-ixtisoslashtirilgan maktab", regionId: 'reg-04',
  regionName: "Farg'ona viloyati", district: "Farg'ona shahri", director: 'Qodirov Sherzod Aliyevich',
  studentCount: 1050, image: "https://img.rocket.new/generatedImages/rocket_gen_img_11ee53c96-1765218509208.png",
  overallScore: 91.5, nationalRank: 4, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 34, olimpiadScore: 93, examAvg: 90, attendance: 94, teacherRating: 90,
  monthlyTrend: [80, 82, 84, 85, 87, 88, 89, 90, 91, 91, 92, 92],
  createdAt: '2019-09-01'
},
{
  id: 'sch-004b', name: "Marg'ilon 4-maktab", regionId: 'reg-04',
  regionName: "Farg'ona viloyati", district: "Marg'ilon shahri", director: 'Mirzayev Otabek Sobirov',
  studentCount: 810, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1808937cb-1772539827056.png",
  overallScore: 80.6, nationalRank: 17, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 18, olimpiadScore: 81, examAvg: 79, attendance: 83, teacherRating: 80,
  monthlyTrend: [73, 74, 75, 76, 78, 79, 80, 80, 80, 80, 81, 81],
  createdAt: '2020-09-01'
},
{
  id: 'sch-004c', name: "Qo'qon 9-maktab", regionId: 'reg-04',
  regionName: "Farg'ona viloyati", district: "Qo'qon shahri", director: 'Xolmatova Dilnoza Karimovna',
  studentCount: 690, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 75.3, nationalRank: 22, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 13, olimpiadScore: 75, examAvg: 74, attendance: 78, teacherRating: 75,
  monthlyTrend: [68, 69, 70, 71, 73, 74, 75, 75, 75, 75, 75, 75],
  createdAt: '2021-09-01'
},
{
  id: 'sch-004d', name: "Rishton 2-maktab", regionId: 'reg-04',
  regionName: "Farg'ona viloyati", district: "Rishton tumani", director: 'Abdullayev Kamol Hamidovich',
  studentCount: 520, image: "https://img.rocket.new/generatedImages/rocket_gen_img_142d3c9bf-1763301932985.png",
  overallScore: 70.8, nationalRank: 28, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 10, olimpiadScore: 71, examAvg: 70, attendance: 73, teacherRating: 70,
  monthlyTrend: [63, 64, 65, 66, 68, 69, 70, 70, 71, 71, 71, 71],
  createdAt: '2019-09-01'
},
{
  id: 'sch-005', name: 'Andijon 2-ixtisoslashtirilgan maktab', regionId: 'reg-05',
  regionName: 'Andijon viloyati', district: 'Andijon shahri', director: 'Yusupova Dilnoza Baxtiyorovna',
  studentCount: 890, image: "https://img.rocket.new/generatedImages/rocket_gen_img_11d73b416-1773039553566.png",
  overallScore: 90.2, nationalRank: 5, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 31, olimpiadScore: 92, examAvg: 88, attendance: 93, teacherRating: 89,
  monthlyTrend: [78, 80, 82, 83, 85, 87, 88, 89, 90, 90, 90, 90],
  createdAt: '2020-09-01'
},
{
  id: 'sch-005b', name: 'Andijon 10-maktab', regionId: 'reg-05',
  regionName: 'Andijon viloyati', district: 'Andijon shahri', director: 'Karimov Sherzod Normatovich',
  studentCount: 740, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbabf6b9-1775991076510.png",
  overallScore: 79.8, nationalRank: 19, regionRank: 2, districtRank: 2,
  status: 'active', certificates: 16, olimpiadScore: 80, examAvg: 79, attendance: 82, teacherRating: 79,
  monthlyTrend: [72, 73, 74, 75, 77, 78, 79, 79, 80, 80, 80, 80],
  createdAt: '2020-09-01'
},
{
  id: 'sch-005c', name: 'Xo\'jaobod 1-maktab', regionId: 'reg-05',
  regionName: 'Andijon viloyati', district: 'Xo\'jaobod tumani', director: 'Tursunova Gulnora Saidovna',
  studentCount: 580, image: "https://img.rocket.new/generatedImages/rocket_gen_img_164808e23-1772539827695.png",
  overallScore: 73.5, nationalRank: 25, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 12, olimpiadScore: 74, examAvg: 72, attendance: 76, teacherRating: 73,
  monthlyTrend: [66, 67, 68, 69, 71, 72, 73, 73, 73, 74, 74, 74],
  createdAt: '2021-09-01'
},
{
  id: 'sch-005d', name: 'Oltinko\'l 3-maktab', regionId: 'reg-05',
  regionName: 'Andijon viloyati', district: 'Oltinko\'l tumani', director: 'Nazarov Bobur Hamidovich',
  studentCount: 490, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 69.4, nationalRank: 30, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 9, olimpiadScore: 69, examAvg: 68, attendance: 72, teacherRating: 69,
  monthlyTrend: [62, 63, 64, 65, 67, 68, 69, 69, 69, 69, 69, 69],
  createdAt: '2019-09-01'
},
{
  id: 'sch-006', name: 'Namangan 5-ixtisoslashtirilgan maktab', regionId: 'reg-06',
  regionName: 'Namangan viloyati', district: 'Namangan shahri', director: 'Ergashev Timur Abdullayevich',
  studentCount: 820, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12dc17e13-1765087004039.png",
  overallScore: 88.7, nationalRank: 6, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 28, olimpiadScore: 90, examAvg: 87, attendance: 92, teacherRating: 87,
  monthlyTrend: [76, 78, 79, 81, 83, 84, 86, 87, 88, 88, 89, 89],
  createdAt: '2021-09-01'
},
{
  id: 'sch-006b', name: 'Namangan 12-maktab', regionId: 'reg-06',
  regionName: 'Namangan viloyati', district: 'Namangan shahri', director: 'Holiqov Sanjar Aliyevich',
  studentCount: 680, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 78.4, nationalRank: 21, regionRank: 2, districtRank: 2,
  status: 'active', certificates: 15, olimpiadScore: 79, examAvg: 77, attendance: 81, teacherRating: 78,
  monthlyTrend: [71, 72, 73, 74, 76, 77, 78, 78, 78, 78, 78, 78],
  createdAt: '2020-09-01'
},
{
  id: 'sch-006c', name: 'Chortoq 4-maktab', regionId: 'reg-06',
  regionName: 'Namangan viloyati', district: 'Chortoq tumani', director: 'Yusupova Barno Karimovna',
  studentCount: 540, image: "https://img.rocket.new/generatedImages/rocket_gen_img_142d3c9bf-1763301932985.png",
  overallScore: 72.1, nationalRank: 27, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 11, olimpiadScore: 72, examAvg: 71, attendance: 74, teacherRating: 72,
  monthlyTrend: [65, 66, 67, 68, 70, 71, 72, 72, 72, 72, 72, 72],
  createdAt: '2021-09-01'
},
{
  id: 'sch-006d', name: 'Kosonsoy 2-maktab', regionId: 'reg-06',
  regionName: 'Namangan viloyati', district: 'Kosonsoy tumani', director: 'Mirzayev Ulugbek Sobirov',
  studentCount: 460, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1df00b4f4-1765284588935.png",
  overallScore: 67.8, nationalRank: 32, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 8, olimpiadScore: 68, examAvg: 67, attendance: 70, teacherRating: 67,
  monthlyTrend: [60, 61, 62, 63, 65, 66, 67, 67, 68, 68, 68, 68],
  createdAt: '2019-09-01'
},
{
  id: 'sch-008', name: 'Qarshi 1-ixtisoslashtirilgan maktab', regionId: 'reg-07',
  regionName: 'Qashqadaryo viloyati', district: 'Qarshi shahri', director: 'Holmatov Sarvar Ulashevich',
  studentCount: 840, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 86.1, nationalRank: 8, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 24, olimpiadScore: 87, examAvg: 84, attendance: 90, teacherRating: 85,
  monthlyTrend: [72, 74, 76, 78, 80, 81, 83, 84, 85, 86, 86, 86],
  createdAt: '2020-09-01'
},
{
  id: 'sch-008b', name: 'Shahrisabz 3-maktab', regionId: 'reg-07',
  regionName: 'Qashqadaryo viloyati', district: 'Shahrisabz shahri', director: 'Toshmatov Bahodir Hamidovich',
  studentCount: 700, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 77.3, nationalRank: 22, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 14, olimpiadScore: 78, examAvg: 76, attendance: 80, teacherRating: 77,
  monthlyTrend: [70, 71, 72, 73, 75, 76, 77, 77, 77, 77, 77, 77],
  createdAt: '2020-09-01'
},
{
  id: 'sch-008c', name: 'Koson 5-maktab', regionId: 'reg-07',
  regionName: 'Qashqadaryo viloyati', district: 'Koson tumani', director: 'Abdullayeva Nilufar Sobirov',
  studentCount: 560, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 71.6, nationalRank: 28, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 10, olimpiadScore: 72, examAvg: 70, attendance: 74, teacherRating: 71,
  monthlyTrend: [64, 65, 66, 67, 69, 70, 71, 71, 72, 72, 72, 72],
  createdAt: '2021-09-01'
},
{
  id: 'sch-008d', name: 'Muborak 1-maktab', regionId: 'reg-07',
  regionName: 'Qashqadaryo viloyati', district: 'Muborak tumani', director: 'Xoliqov Doniyor Aliyevich',
  studentCount: 480, image: "https://img.rocket.new/generatedImages/rocket_gen_img_18e011993-1777141894538.png",
  overallScore: 66.9, nationalRank: 33, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 7, olimpiadScore: 67, examAvg: 66, attendance: 69, teacherRating: 66,
  monthlyTrend: [59, 60, 61, 62, 64, 65, 66, 66, 67, 67, 67, 67],
  createdAt: '2019-09-01'
},
{
  id: 'sch-010', name: 'Termiz 8-maktab', regionId: 'reg-08',
  regionName: 'Surxondaryo viloyati', district: 'Termiz shahri', director: 'Xasanov Doniyor Bekmurodovich',
  studentCount: 720, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e893b529-1776989178580.png",
  overallScore: 84.6, nationalRank: 10, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 21, olimpiadScore: 85, examAvg: 83, attendance: 88, teacherRating: 84,
  monthlyTrend: [70, 72, 73, 75, 77, 79, 80, 82, 83, 84, 84, 85],
  createdAt: '2021-09-01'
},
{
  id: 'sch-010b', name: 'Denov 2-maktab', regionId: 'reg-08',
  regionName: 'Surxondaryo viloyati', district: 'Denov shahri', director: 'Qosimov Sardor Hamidovich',
  studentCount: 590, image: "https://img.rocket.new/generatedImages/rocket_gen_img_113be2f93-1772212556327.png",
  overallScore: 75.8, nationalRank: 23, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 13, olimpiadScore: 76, examAvg: 75, attendance: 78, teacherRating: 75,
  monthlyTrend: [68, 69, 70, 71, 73, 74, 75, 75, 76, 76, 76, 76],
  createdAt: '2020-09-01'
},
{
  id: 'sch-010c', name: 'Boysun 4-maktab', regionId: 'reg-08',
  regionName: 'Surxondaryo viloyati', district: 'Boysun tumani', director: 'Tursunova Maftuna Aliyevna',
  studentCount: 450, image: "https://img.rocket.new/generatedImages/rocket_gen_img_113be2f93-1772212556327.png",
  overallScore: 69.3, nationalRank: 31, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 9, olimpiadScore: 69, examAvg: 68, attendance: 72, teacherRating: 69,
  monthlyTrend: [62, 63, 64, 65, 67, 68, 69, 69, 69, 69, 69, 69],
  createdAt: '2021-09-01'
},
{
  id: 'sch-010d', name: 'Sho\'rchi 1-maktab', regionId: 'reg-08',
  regionName: 'Surxondaryo viloyati', district: 'Sho\'rchi tumani', director: 'Ergashev Kamol Normatovich',
  studentCount: 390, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 64.7, nationalRank: 36, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 7, olimpiadScore: 65, examAvg: 64, attendance: 67, teacherRating: 64,
  monthlyTrend: [57, 58, 59, 60, 62, 63, 64, 64, 65, 65, 65, 65],
  createdAt: '2019-09-01'
},
{
  id: 'sch-007', name: 'Buxoro 3-ixtisoslashtirilgan maktab', regionId: 'reg-09',
  regionName: 'Buxoro viloyati', district: 'Buxoro shahri', director: 'Nazarov Oybek Ravshanovitch',
  studentCount: 760, image: "https://img.rocket.new/generatedImages/rocket_gen_img_122778d29-1776071972473.png",
  overallScore: 87.4, nationalRank: 7, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 26, olimpiadScore: 89, examAvg: 85, attendance: 91, teacherRating: 86,
  monthlyTrend: [74, 76, 77, 79, 81, 82, 84, 85, 87, 87, 87, 87],
  createdAt: '2019-09-01'
},
{
  id: 'sch-007b', name: 'G\'ijduvon 2-maktab', regionId: 'reg-09',
  regionName: 'Buxoro viloyati', district: 'G\'ijduvon tumani', director: 'Holmatova Zulfiya Karimovna',
  studentCount: 620, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 78.9, nationalRank: 20, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 16, olimpiadScore: 79, examAvg: 78, attendance: 81, teacherRating: 79,
  monthlyTrend: [71, 72, 73, 74, 76, 77, 78, 78, 79, 79, 79, 79],
  createdAt: '2020-09-01'
},
{
  id: 'sch-007c', name: 'Kogon 5-maktab', regionId: 'reg-09',
  regionName: 'Buxoro viloyati', district: 'Kogon shahri', director: 'Mirzayev Otabek Aliyevich',
  studentCount: 500, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 73.2, nationalRank: 26, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 11, olimpiadScore: 73, examAvg: 72, attendance: 76, teacherRating: 73,
  monthlyTrend: [66, 67, 68, 69, 71, 72, 73, 73, 73, 73, 73, 73],
  createdAt: '2021-09-01'
},
{
  id: 'sch-007d', name: 'Qorovulbozor 1-maktab', regionId: 'reg-09',
  regionName: 'Buxoro viloyati', district: 'Qorovulbozor tumani', director: 'Tursunov Bahodir Sobirov',
  studentCount: 420, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 68.5, nationalRank: 31, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 8, olimpiadScore: 70, examAvg: 69, attendance: 73, teacherRating: 70,
  monthlyTrend: [61, 62, 63, 64, 66, 67, 68, 68, 68, 68, 68, 68],
  createdAt: '2019-09-01'
},
{
  id: 'sch-011', name: 'Urganch 2-maktab', regionId: 'reg-10',
  regionName: 'Xorazm viloyati', district: 'Urganch shahri', director: 'Abdullayev Kamol Rustamovich',
  studentCount: 640, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 83.2, nationalRank: 11, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 19, olimpiadScore: 84, examAvg: 82, attendance: 87, teacherRating: 82,
  monthlyTrend: [69, 71, 72, 74, 76, 77, 79, 80, 82, 83, 83, 83],
  createdAt: '2019-09-01'
},
{
  id: 'sch-011b', name: 'Xiva 3-maktab', regionId: 'reg-10',
  regionName: 'Xorazm viloyati', district: 'Xiva shahri', director: 'Yusupov Sherzod Hamidovich',
  studentCount: 530, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 76.4, nationalRank: 22, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 13, olimpiadScore: 77, examAvg: 75, attendance: 79, teacherRating: 76,
  monthlyTrend: [70, 71, 72, 73, 75, 76, 77, 77, 78, 78, 78, 78],
  createdAt: '2020-09-01'
},
{
  id: 'sch-011c', name: 'Gurlan 1-maktab', regionId: 'reg-10',
  regionName: 'Xorazm viloyati', district: 'Gurlan tumani', director: 'Holiqova Barno Aliyevna',
  studentCount: 430, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 70.1, nationalRank: 29, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 9, olimpiadScore: 70, examAvg: 69, attendance: 73, teacherRating: 70,
  monthlyTrend: [63, 64, 65, 66, 68, 69, 70, 70, 70, 70, 70, 70],
  createdAt: '2021-09-01'
},
{
  id: 'sch-011d', name: 'Shovot 4-maktab', regionId: 'reg-10',
  regionName: 'Xorazm viloyati', district: 'Shovot tumani', director: 'Nazarov Ulugbek Karimovich',
  studentCount: 360, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 65.3, nationalRank: 35, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 7, olimpiadScore: 65, examAvg: 64, attendance: 68, teacherRating: 65,
  monthlyTrend: [58, 59, 60, 61, 63, 64, 65, 65, 65, 65, 65, 65],
  createdAt: '2019-09-01'
},
{
  id: 'sch-nav-01', name: 'Navoiy 1-ixtisoslashtirilgan maktab', regionId: 'reg-11',
  regionName: 'Navoiy viloyati', district: 'Navoiy shahri', director: 'Qodirov Bahodir Hamidovich',
  studentCount: 680, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 82.5, nationalRank: 12, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 20, olimpiadScore: 83, examAvg: 81, attendance: 85, teacherRating: 82,
  monthlyTrend: [75, 76, 77, 78, 80, 81, 82, 82, 82, 82, 82, 83],
  createdAt: '2019-09-01'
},
{
  id: 'sch-nav-02', name: 'Zarafshon 2-maktab', regionId: 'reg-11',
  regionName: 'Navoiy viloyati', district: 'Zarafshon shahri', director: 'Mirzayeva Gulnora Aliyevna',
  studentCount: 540, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 75.6, nationalRank: 23, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 13, olimpiadScore: 76, examAvg: 74, attendance: 78, teacherRating: 75,
  monthlyTrend: [68, 69, 70, 71, 73, 74, 75, 75, 76, 76, 76, 76],
  createdAt: '2020-09-01'
},
{
  id: 'sch-nav-03', name: 'Karmana 3-maktab', regionId: 'reg-11',
  regionName: 'Navoiy viloyati', district: 'Karmana tumani', director: 'Ergashev Nodir Sobirov',
  studentCount: 420, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 69.8, nationalRank: 30, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 9, olimpiadScore: 70, examAvg: 69, attendance: 72, teacherRating: 69,
  monthlyTrend: [62, 63, 64, 65, 67, 68, 69, 69, 70, 70, 70, 70],
  createdAt: '2021-09-01'
},
{
  id: 'sch-nav-04', name: 'Nurota 1-maktab', regionId: 'reg-11',
  regionName: 'Navoiy viloyati', district: 'Nurota tumani', director: 'Holmatov Kamol Aliyevich',
  studentCount: 350, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 64.2, nationalRank: 37, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 7, olimpiadScore: 64, examAvg: 63, attendance: 67, teacherRating: 64,
  monthlyTrend: [57, 58, 59, 60, 62, 63, 64, 64, 64, 64, 64, 64],
  createdAt: '2019-09-01'
},
{
  id: 'sch-012', name: 'Jizzax 4-maktab', regionId: 'reg-12',
  regionName: 'Jizzax viloyati', district: 'Jizzax shahri', director: 'Tursunov Bahodir Hamidovich',
  studentCount: 590, image: "https://img.rocket.new/generatedImages/rocket_gen_img_16395dd44-1773039557044.png",
  overallScore: 82.1, nationalRank: 12, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 18, olimpiadScore: 83, examAvg: 81, attendance: 86, teacherRating: 81,
  monthlyTrend: [68, 70, 71, 73, 75, 76, 78, 79, 81, 82, 82, 82],
  createdAt: '2020-09-01'
},
{
  id: 'sch-012b', name: 'Zomin 2-maktab', regionId: 'reg-12',
  regionName: 'Jizzax viloyati', district: 'Zomin tumani', director: 'Abdullayev Sardor Normatovich',
  studentCount: 470, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 74.3, nationalRank: 24, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 12, olimpiadScore: 74, examAvg: 73, attendance: 77, teacherRating: 74,
  monthlyTrend: [67, 68, 69, 70, 72, 73, 74, 74, 74, 74, 74, 74],
  createdAt: '2020-09-01'
},
{
  id: 'sch-012c', name: 'G\'allaorol 1-maktab', regionId: 'reg-12',
  regionName: 'Jizzax viloyati', district: 'G\'allaorol tumani', director: 'Xoliqova Dilnoza Karimovna',
  studentCount: 380, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 68.7, nationalRank: 32, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 8, olimpiadScore: 69, examAvg: 67, attendance: 71, teacherRating: 68,
  monthlyTrend: [61, 62, 63, 64, 66, 67, 68, 68, 69, 69, 69, 69],
  createdAt: '2021-09-01'
},
{
  id: 'sch-012d', name: 'Yangiobod 3-maktab', regionId: 'reg-12',
  regionName: 'Jizzax viloyati', district: 'Yangiobod tumani', director: 'Toshmatov Nodir Hamidovich',
  studentCount: 310, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 63.4, nationalRank: 38, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 6, olimpiadScore: 63, examAvg: 62, attendance: 66, teacherRating: 63,
  monthlyTrend: [56, 57, 58, 59, 61, 62, 63, 63, 63, 63, 63, 63],
  createdAt: '2019-09-01'
},
{
  id: 'sch-sir-01', name: 'Guliston 1-ixtisoslashtirilgan maktab', regionId: 'reg-13',
  regionName: 'Sirdaryo viloyati', district: 'Guliston shahri', director: 'Yusupov Alisher Hamidovich',
  studentCount: 560, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 80.3, nationalRank: 13, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 17, olimpiadScore: 81, examAvg: 79, attendance: 83, teacherRating: 80,
  monthlyTrend: [73, 74, 75, 76, 78, 79, 80, 80, 80, 80, 80, 80],
  createdAt: '2019-09-01'
},
{
  id: 'sch-sir-02', name: 'Sirdaryo 5-maktab', regionId: 'reg-13',
  regionName: 'Sirdaryo viloyati', district: 'Sirdaryo shahri', director: 'Karimova Maftuna Sobirov',
  studentCount: 440, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 73.1, nationalRank: 25, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 11, olimpiadScore: 73, examAvg: 72, attendance: 76, teacherRating: 73,
  monthlyTrend: [66, 67, 68, 69, 71, 72, 73, 73, 73, 74, 74, 74],
  createdAt: '2020-09-01'
},
{
  id: 'sch-sir-03', name: 'Boyovut 2-maktab', regionId: 'reg-13',
  regionName: 'Sirdaryo viloyati', district: 'Boyovut tumani', director: 'Nazarov Bobur Aliyevich',
  studentCount: 350, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 67.4, nationalRank: 33, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 8, olimpiadScore: 67, examAvg: 66, attendance: 70, teacherRating: 67,
  monthlyTrend: [60, 61, 62, 63, 65, 66, 67, 67, 67, 67, 67, 67],
  createdAt: '2021-09-01'
},
{
  id: 'sch-sir-04', name: 'Oqoltin 1-maktab', regionId: 'reg-13',
  regionName: 'Sirdaryo viloyati', district: 'Oqoltin tumani', director: 'Holmatova Barno Karimovna',
  studentCount: 280, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 62.8, nationalRank: 39, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 6, olimpiadScore: 63, examAvg: 61, attendance: 65, teacherRating: 62,
  monthlyTrend: [55, 56, 57, 58, 60, 61, 62, 62, 63, 63, 63, 63],
  createdAt: '2019-09-01'
},
{
  id: 'sch-qqp-01', name: "No'кис 5-ixtisoslashtirilgan maktab", regionId: 'reg-14',
  regionName: "Qoraqalпog'iston", district: "No'кис шахри", director: "Jurayев Бахтиyor Алиевич",
  studentCount: 620, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 78.6, nationalRank: 14, regionRank: 1, districtRank: 1,
  status: 'active', certificates: 15, olimpiadScore: 79, examAvg: 77, attendance: 81, teacherRating: 78,
  monthlyTrend: [71, 72, 73, 74, 76, 77, 78, 78, 78, 78, 79, 79],
  createdAt: '2019-09-01'
},
{
  id: 'sch-qqp-02', name: "Тартул 3-макtab", regionId: 'reg-14',
  regionName: "Qoraқалпог'iston", district: "Тартул тумани", director: "Холмасаров Бахтиyor Алиевич",
  studentCount: 540, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 71.4, nationalRank: 27, regionRank: 2, districtRank: 1,
  status: 'active', certificates: 10, olimpiadScore: 71, examAvg: 70, attendance: 74, teacherRating: 71,
  monthlyTrend: [64, 65, 66, 67, 69, 70, 71, 71, 72, 72, 72, 72],
  createdAt: '2020-09-01'
},
{
  id: 'sch-qqp-03', name: "Шахриш 2-макtab", regionId: 'reg-14',
  regionName: "Qoraқалпог'iston", district: "Шахриш шахри", director: "Турсунов Бахтиyor Алиевич",
  studentCount: 460, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 65.7, nationalRank: 34, regionRank: 3, districtRank: 1,
  status: 'active', certificates: 7, olimpiadScore: 66, examAvg: 64, attendance: 68, teacherRating: 65,
  monthlyTrend: [58, 59, 60, 61, 63, 64, 65, 65, 66, 66, 66, 66],
  createdAt: '2021-09-01'
},
{
  id: 'sch-qqp-04', name: "Беруши 1-макtab", regionId: 'reg-14',
  regionName: "Qoraқалпог'iston", district: "Беруши тумани", director: "Абдуррахимов Бахтиyor Алиевич",
  studentCount: 380, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12f1dc50c-1772355319814.png",
  overallScore: 60.2, nationalRank: 40, regionRank: 4, districtRank: 1,
  status: 'active', certificates: 5, olimpiadScore: 60, examAvg: 59, attendance: 63, teacherRating: 60,
  monthlyTrend: [53, 54, 55, 56, 58, 59, 60, 60, 60, 60, 60, 60],
  createdAt: '2019-09-01'
}];


export const certificates: Certificate[] = [
{ id: 'cert-001', schoolId: 'sch-001', title: 'Matematika olimpiadasi — Respublika 1-o\'rni', category: 'olimpiad', score: 20, issuedTo: 'Karimov Asilbek', issuer: 'O\'zbekiston Xalq Ta\'limi Vazirligi', date: '2026-03-15', status: 'verified', fileUrl: '#' },
{ id: 'cert-002', schoolId: 'sch-001', title: 'Fizika olimpiadasi — Viloyat 1-o\'rni', category: 'olimpiad', score: 15, issuedTo: 'Nazarova Zilola', issuer: 'Toshkent Shahar XTV', date: '2026-02-20', status: 'verified', fileUrl: '#' },
{ id: 'cert-003', schoolId: 'sch-001', title: 'Ingliz tili — Xalqaro sertifikat (B2)', category: 'science', score: 12, issuedTo: 'Toshmatov Jasur', issuer: 'Cambridge Assessment', date: '2026-01-10', status: 'verified', fileUrl: '#' },
{ id: 'cert-004', schoolId: 'sch-001', title: 'Informatika olimpiadasi — Respublika 2-o\'rni', category: 'olimpiad', score: 17, issuedTo: 'Yusupov Sherzod', issuer: 'O\'zbekiston XTV', date: '2026-03-28', status: 'verified', fileUrl: '#' },
{ id: 'cert-005', schoolId: 'sch-001', title: 'Sport — Kurash bo\'yicha respublika chempioni', category: 'sport', score: 10, issuedTo: 'Holmatov Doniyor', issuer: 'O\'zbekiston Sport Federatsiyasi', date: '2026-02-05', status: 'pending', fileUrl: '#' },
{ id: 'cert-006', schoolId: 'sch-002', title: 'Kimyo olimpiadasi — Viloyat 1-o\'rni', category: 'olimpiad', score: 14, issuedTo: 'Mirzayeva Malika', issuer: 'Toshkent Shahar XTV', date: '2026-03-10', status: 'verified', fileUrl: '#' },
{ id: 'cert-007', schoolId: 'sch-003', title: 'Tarix olimpiadasi — Respublika 3-o\'rni', category: 'olimpiad', score: 10, issuedTo: 'Ergashev Timur', issuer: 'O\'zbekiston XTV', date: '2026-02-28', status: 'verified', fileUrl: '#' }];


export const users: User[] = [
  { id: 'usr-001', name: 'Abdullayev Sardor', email: 'sardor@maktabreyting.uz', role: 'super_admin', createdAt: '2024-01-15', status: 'active', lastLogin: '2026-04-25T14:30:00' },
  { id: 'usr-002', name: 'Rahimova Nilufar', email: 'nilufar.toshkent@maktabreyting.uz', role: 'region_admin', region: 'reg-01', createdAt: '2024-03-01', status: 'active', lastLogin: '2026-04-25T10:15:00' },
  { id: 'usr-003', name: 'Azimov Behruz', email: 'azimov.sch001@maktabreyting.uz', role: 'school_admin', school: 'sch-001', createdAt: '2024-04-01', status: 'active', lastLogin: '2026-04-25T09:00:00' },
  { id: 'usr-004', name: 'Rashidova Malika', email: 'malika.sch002@maktab.uz', role: 'school_admin', school: 'sch-002', createdAt: '2024-04-10', status: 'active', lastLogin: '2026-04-23T11:30:00' },
  { id: 'usr-std-01', name: 'Otabek', lastName: 'Xolmatov', username: 'otabek07', role: 'student', sinf: '9A', region: 'reg-01', district: 'Mirzo Ulug\'bek tumani', school: 'sch-001', createdAt: '2024-05-10', status: 'active', lastLogin: '2026-04-26T12:00:00' },
];


export const regionalBarData = [
{ region: 'Toshkent sh.', score: 84.2, schools: 487 },
{ region: 'Toshkent v.', score: 78.6, schools: 412 },
{ region: 'Samarqand', score: 76.4, schools: 398 },
{ region: "Farg\'ona", score: 75.8, schools: 441 },
{ region: 'Andijon', score: 74.3, schools: 389 },
{ region: 'Namangan', score: 73.1, schools: 356 },
{ region: 'Buxoro', score: 72.7, schools: 287 },
{ region: 'Navoiy', score: 71.2, schools: 198 },
{ region: 'Jizzax', score: 70.6, schools: 221 },
{ region: 'Qashqadaryo', score: 71.9, schools: 378 },
{ region: 'Surxondaryo', score: 70.4, schools: 312 },
{ region: 'Xorazm', score: 69.8, schools: 276 },
{ region: 'Sirdaryo', score: 68.9, schools: 156 },
{ region: "Qoraqalpog\'.", score: 67.3, schools: 234 }];