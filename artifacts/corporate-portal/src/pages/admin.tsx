import { useState, useEffect } from "react";
import { Shell } from "@/components/layout/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import {
  Users,
  UserCheck,
  PhoneCall,
  BookOpen,
  Search,
  Mail,
  Phone,
  Building,
  Edit,
  CheckCircle,
  Clock,
  UserPlus,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  MessageSquare
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  enrolledCourses: string[];
  enrollmentStatus: "new" | "contacted" | "enrolled" | "inactive";
  adminNotes: string;
  createdAt: string;
}

interface AdminStats {
  totalStudents: number;
  newStudents: number;
  contactedStudents: number;
  enrolledStudents: number;
  totalInquiries: number;
}

const AVAILABLE_COURSES = [
  "AI Foundations for Enterprise",
  "Generative AI for Business Leaders",
  "Machine Learning Operations (MLOps)",
  "AI Ethics and Responsible AI",
  "Natural Language Processing for Enterprises"
];

export function AdminPortal() {
  const { user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Edit Modal State
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState<string>("");
  const [editCourses, setEditCourses] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast({
        title: "Access Restricted",
        description: "Admin privileges required to access the Admin Portal.",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }
    fetchAdminData();
  }, [user, statusFilter]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      // Fetch Stats
      const statsRes = await fetch("/api/admin/dashboard-stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch Students
      const url = `/api/admin/students?status=${statusFilter}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`;
      const studentsRes = await fetch(url);
      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        setStudents(studentsData);
      }
    } catch (err: any) {
      toast({
        title: "Error Loading Admin Portal Data",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData();
  };

  const openManageModal = (student: Student) => {
    setSelectedStudent(student);
    setEditStatus(student.enrollmentStatus);
    setEditNotes(student.adminNotes || "");
    setEditCourses(student.enrolledCourses || []);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = async () => {
    if (!selectedStudent) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/students/${selectedStudent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentStatus: editStatus,
          enrolledCourses: editCourses,
          adminNotes: editNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update student profile");

      toast({
        title: "Student Profile Updated",
        description: `Updated status for ${selectedStudent.name} to ${editStatus.toUpperCase()}`,
      });

      setIsModalOpen(false);
      fetchAdminData();
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleCourseEnrollment = (courseTitle: string) => {
    if (editCourses.includes(courseTitle)) {
      setEditCourses(editCourses.filter((c) => c !== courseTitle));
    } else {
      setEditCourses([...editCourses, courseTitle]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20"><Clock className="h-3 w-3 mr-1" /> New Registered</Badge>;
      case "contacted":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20"><PhoneCall className="h-3 w-3 mr-1" /> Contacted</Badge>;
      case "enrolled":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" /> Enrolled</Badge>;
      default:
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  return (
    <Shell>
      <div className="bg-secondary/30 border-b border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                <ShieldCheck className="h-3.5 w-3.5" /> Administrator Operations Portal
              </div>
              <h1 className="text-3xl font-display font-bold">Student Outreach & Course Enrollment</h1>
              <p className="text-muted-foreground text-sm">Review registered students, log outreach calls, and enroll candidates into corporate courses.</p>
            </div>
            <Button onClick={fetchAdminData} variant="outline" size="sm" className="gap-2 self-start md:self-auto">
              <RefreshCw className="h-4 w-4" /> Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider">Total Registered</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                {stats?.totalStudents ?? 0}
                <Users className="h-5 w-5 text-primary opacity-75" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider">Needs Outreach</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center justify-between text-blue-500">
                {stats?.newStudents ?? 0}
                <Clock className="h-5 w-5 opacity-75" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider">Contacted / In Progress</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center justify-between text-amber-500">
                {stats?.contactedStudents ?? 0}
                <PhoneCall className="h-5 w-5 opacity-75" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider">Enrolled Candidates</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center justify-between text-green-500">
                {stats?.enrolledStudents ?? 0}
                <UserCheck className="h-5 w-5 opacity-75" />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="border-border/50">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-96">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search student by name, email or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Button type="submit" size="sm" variant="secondary">Filter</Button>
            </form>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Filter Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Registered</SelectItem>
                  <SelectItem value="new">New (Needs Call)</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Student Roster Table */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-secondary/10">
            <CardTitle className="text-lg">Student Roster & Outreach Table</CardTitle>
            <CardDescription>Click "Manage Outreach" to log calls, add notes, and enroll students into courses.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading student roster...</div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground space-y-2">
                <Users className="h-10 w-10 mx-auto opacity-50" />
                <p>No registered students match the current filter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/40 text-muted-foreground text-xs uppercase font-medium border-b border-border/50">
                    <tr>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Contact Details</th>
                      <th className="px-6 py-3">Outreach Status</th>
                      <th className="px-6 py-3">Enrolled Courses</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {student.name}
                          {student.adminNotes && (
                            <p className="text-xs font-normal text-muted-foreground truncate max-w-xs mt-0.5">
                              <MessageSquare className="h-3 w-3 inline mr-1 text-primary" />
                              {student.adminNotes}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center text-xs text-muted-foreground">
                            <Building className="h-3.5 w-3.5 mr-1" /> {student.company || "Independent"}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <div className="flex items-center text-xs">
                            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <a href={`mailto:${student.email}`} className="text-primary hover:underline">{student.email}</a>
                          </div>
                          {student.phone && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Phone className="h-3.5 w-3.5 mr-1" />
                              <a href={`tel:${student.phone}`} className="hover:underline">{student.phone}</a>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(student.enrollmentStatus)}
                        </td>
                        <td className="px-6 py-4">
                          {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {student.enrolledCourses.map((c, i) => (
                                <Badge key={i} variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                                  <BookOpen className="h-2.5 w-2.5 mr-1" /> {c}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">None Enrolled</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button size="sm" onClick={() => openManageModal(student)} className="gap-1.5 font-medium">
                            <Edit className="h-3.5 w-3.5" /> Manage Outreach
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MANAGE STUDENT MODAL */}
      {selectedStudent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Manage {selectedStudent.name}
              </DialogTitle>
              <DialogDescription>
                Reach out to this student and update their course enrollment status.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Quick Contact Buttons */}
              <div className="p-3 bg-secondary/30 rounded-lg flex items-center justify-between border border-border/50">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Direct Reach-Out</p>
                  <p className="text-sm font-medium">{selectedStudent.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild className="gap-1 text-xs">
                    <a href={`mailto:${selectedStudent.email}?subject=AI Linc Corporate Training Enrollment`}>
                      <Mail className="h-3.5 w-3.5" /> Email Student
                    </a>
                  </Button>
                  {selectedStudent.phone && (
                    <Button size="sm" variant="outline" asChild className="gap-1 text-xs">
                      <a href={`tel:${selectedStudent.phone}`}>
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Enrollment Pipeline Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New (Needs Outreach)</SelectItem>
                    <SelectItem value="contacted">Contacted / In Discussion</SelectItem>
                    <SelectItem value="enrolled">Enrolled in Course(s)</SelectItem>
                    <SelectItem value="inactive">Inactive / Passed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Assignment */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Assign / Enroll Courses</Label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {AVAILABLE_COURSES.map((course) => {
                    const isEnrolled = editCourses.includes(course);
                    return (
                      <div
                        key={course}
                        onClick={() => toggleCourseEnrollment(course)}
                        className={`p-2 rounded-md text-xs cursor-pointer flex items-center justify-between border transition-colors ${
                          isEnrolled
                            ? "bg-primary/10 border-primary text-primary font-medium"
                            : "bg-background border-border hover:bg-secondary/40 text-muted-foreground"
                        }`}
                      >
                        <span>{course}</span>
                        {isEnrolled ? <CheckCircle className="h-4 w-4 text-primary" /> : <UserPlus className="h-4 w-4 text-muted-foreground opacity-50" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin Outreach Notes */}
              <div className="space-y-2">
                <Label htmlFor="admin-notes" className="text-sm font-semibold">Admin Outreach Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Record summary of email or phone call (e.g. Requested workshop quote for 20 team members...)"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateStudent} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Enrollment Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Shell>
  );
}
