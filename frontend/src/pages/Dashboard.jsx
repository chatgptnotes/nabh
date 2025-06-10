import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  ClipboardList, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Bell,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { dashboardApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const StatCard = ({ title, value, icon: Icon, color, description, trend, onClick }) => (
  <div 
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} group`}
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
            trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
        {onClick && (
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        )}
      </div>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'checklist_completed':
        return <ClipboardList className="h-4 w-4 text-green-600" />;
      case 'incident_reported':
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-start space-x-3 py-3">
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {activity.title}
        </p>
        <p className="text-sm text-gray-500">
          by {activity.user} in {activity.department}
          {activity.severity && (
            <span className={`ml-2 font-medium ${getSeverityColor(activity.severity)}`}>
              ({activity.severity})
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard - Simple Test</h1>
        <p className="text-gray-600">Hello {user?.name}!</p>
        <p className="text-gray-600">Department: {user?.department?.name}</p>
        <p className="text-gray-600">Role: {user?.role}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's your hospital's compliance overview for today.
          </p>
          <p className="text-sm text-gray-500">
            Department: {user?.department?.name || 'N/A'} | Role: {user?.role || 'N/A'}
          </p>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Checklists"
          value={statsLoading ? '...' : stats.pendingChecklists || 0}
          icon={ClipboardList}
          color="text-blue-600"
          description="Tasks awaiting completion"
          trend={-5}
        />
        <StatCard
          title="Overdue Tasks"
          value={statsLoading ? '...' : stats.overdueChecklists || 0}
          icon={AlertCircle}
          color="text-red-600"
          description="Tasks past due date"
          trend={2}
        />
        <StatCard
          title="Compliance Rate"
          value={statsLoading ? '...' : `${stats.complianceRate || 0}%`}
          icon={CheckCircle2}
          color="text-green-600"
          description="This month's completion rate"
          trend={8}
        />
        <StatCard
          title="Active Alerts"
          value={statsLoading ? '...' : stats.unreadAlerts || 0}
          icon={Bell}
          color="text-orange-600"
          description="Requires attention"
          trend={-12}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatCard
          title="Expiring Documents"
          value={statsLoading ? '...' : stats.expiringDocuments || 0}
          icon={FileText}
          color="text-purple-600"
          description="Documents expiring soon"
        />
        <StatCard
          title="Open Incidents"
          value={statsLoading ? '...' : stats.openIncidents || 0}
          icon={Shield}
          color="text-red-600"
          description="Unresolved incidents"
        />
        <StatCard
          title="Monthly Progress"
          value={statsLoading ? '...' : stats.completedThisMonth || 0}
          icon={BarChart3}
          color="text-indigo-600"
          description="Tasks completed this month"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Department Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Department Overview</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {statsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {departmentStats.map(dept => (
                  <div key={dept.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{dept.name}</p>
                        <p className="text-sm text-gray-500">
                          {dept.pendingTasks + dept.overdueTasks} total tasks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {dept.overdueTasks > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {dept.overdueTasks} overdue
                        </span>
                      )}
                      {dept.pendingTasks > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {dept.pendingTasks} pending
                        </span>
                      )}
                      {dept.pendingTasks === 0 && dept.overdueTasks === 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Up to date
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {departmentStats.length === 0 && (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No departments found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {activityLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse flex items-start space-x-4">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {activity.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      item.type === 'checklist_completed' ? 'bg-green-100' :
                      item.type === 'incident_reported' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {item.type === 'checklist_completed' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {item.type === 'incident_reported' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {item.type === 'document_uploaded' && <FileText className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        by {item.user} in {item.department}
                        {item.severity && (
                          <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            item.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.severity}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {activity.length === 0 && (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}