import { MapPin, Mail, GitFork, MessageCircle, Link2, Edit3 } from "lucide-react";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import Button from "../common/Button";

const stats = [
  { label: "Projects", value: "48" },
  { label: "Tasks Done", value: "312" },
  { label: "Followers", value: "2.4k" },
];

export default function UserProfileCard() {
  return (
    <div className="card p-5 animate-bounce-in">
      {/* Cover gradient */}
      <div className="relative -mx-5 -mt-5 mb-0 h-20 rounded-t-2xl bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
      </div>

      {/* Avatar + edit */}
      <div className="flex items-end justify-between -mt-8 mb-4 px-1">
        <Avatar initials="AD" size="xl" className="ring-4 ring-white dark:ring-gray-900 shadow-lg" />
        <Button variant="outline" size="sm" icon={Edit3}>Edit</Button>
      </div>

      {/* Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Admin User</h3>
          <Badge variant="purple" size="xs">Pro</Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Full Stack Developer & UI Designer</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 dark:text-gray-500">
          <MapPin className="w-3 h-3" />
          San Francisco, CA
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        {stats.map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-base font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-2 mb-4">
        {[
          { Icon: GitFork,       label: "GitHub",   href: "#" },
          { Icon: MessageCircle, label: "Twitter",  href: "#" },
          { Icon: Link2,         label: "LinkedIn", href: "#" },
          { Icon: Mail,          label: "Email",    href: "#" },
        ].map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            title={label}
            className="p-2 rounded-xl text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-200"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Skills */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Node.js", "TypeScript", "UI/UX", "MongoDB"].map((skill) => (
            <Badge key={skill} variant="default" size="xs">{skill}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
