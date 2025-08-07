import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Zap, ChevronRight, Users, Monitor } from 'lucide-react';

// Mock service data
const mockServices = [
  {
    id: 1,
    title: "1-hour Coding Help",
    description: "Debug your React issues, pair programming session",
    location: "Online",
    availability: "Tomorrow 2:00 PM",
    duration: 60,
    bsuEstimate: 25,
    provider: "Sarah Dev",
    category: "Tech Support"
  },
  {
    id: 2,
    title: "Logo Design",
    description: "Professional logo design with 3 concepts included",
    location: "Online",
    availability: "Thursday 10:00 AM",
    duration: 30,
    bsuEstimate: 35,
    provider: "Mike Graphics",
    category: "Design"
  },
  {
    id: 3,
    title: "Guitar Lesson",
    description: "Beginner to intermediate guitar instruction",
    location: "In-person",
    availability: "Friday 4:00 PM",
    duration: 45,
    bsuEstimate: 20,
    provider: "Alex Music",
    category: "Education"
  },
  {
    id: 4,
    title: "Home Cleaning",
    description: "Deep clean service for apartments and small homes",
    location: "In-person",
    availability: "Saturday 9:00 AM",
    duration: 120,
    bsuEstimate: 45,
    provider: "Clean Team",
    category: "Household"
  },
  {
    id: 5,
    title: "Photo Editing",
    description: "Professional photo retouching and color correction",
    location: "Online",
    availability: "Today 7:00 PM",
    duration: 30,
    bsuEstimate: 15,
    provider: "Photo Pro",
    category: "Creative"
  },
  {
    id: 6,
    title: "Language Tutoring",
    description: "Spanish conversation practice with native speaker",
    location: "Hybrid",
    availability: "Monday 6:00 PM",
    duration: 60,
    bsuEstimate: 30,
    provider: "Maria Lang",
    category: "Education"
  }
];

const ServiceAsInventory = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [proposalData, setProposalData] = useState(null);

  const getLocationIcon = (location) => {
    switch (location) {
      case 'Online':
        return <Monitor className="w-4 h-4" />;
      case 'In-person':
        return <MapPin className="w-4 h-4" />;
      case 'Hybrid':
        return <Users className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationColor = (location) => {
    switch (location) {
      case 'Online':
        return 'bg-blue-100 text-blue-800';
      case 'In-person':
        return 'bg-green-100 text-green-800';
      case 'Hybrid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProposeTradeClick = (service) => {
    setSelectedService(service);
    // Simulate BSU calculation
    const itemBSU = Math.floor(Math.random() * 40) + 20;
    const serviceBSU = service.bsuEstimate;
    const delta = Math.abs(itemBSU - serviceBSU);
    const deltaPercentage = (delta / Math.max(itemBSU, serviceBSU)) * 100;
    
    setProposalData({
      itemBSU,
      serviceBSU,
      delta,
      deltaPercentage,
      isMismatch: deltaPercentage > 15
    });
  };

  const ServiceCard = ({ service }) => (
    <Card className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-3 left-3">
        <Badge variant="secondary" className="bg-black text-white text-xs">
          Service
        </Badge>
      </div>
      
      <CardHeader className="pb-3 pt-12">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {service.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 line-clamp-2">
              {service.description}
            </CardDescription>
          </div>
          <div className="text-right ml-4">
            <div className="text-xl font-bold text-gray-900">{service.bsuEstimate}</div>
            <div className="text-xs text-gray-500">BSU</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {getLocationIcon(service.location)}
            <Badge className={`text-xs ${getLocationColor(service.location)}`}>
              {service.location}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{service.availability}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{service.duration}mins</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{service.provider}</span>
            <Badge variant="outline" className="text-xs">
              {service.category}
            </Badge>
          </div>

          <Button 
            onClick={() => handleProposeTradeClick(service)}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Propose Trade
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CreateServiceForm = () => (
    <Card className="bg-white border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create a Service</CardTitle>
        <CardDescription>List your skills and time for trade</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
          <input 
            type="text" 
            placeholder="e.g., 1-hour Coding Help"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            placeholder="Describe what you'll provide..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Online</option>
              <option>In-person</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>15 mins</option>
              <option>30 mins</option>
              <option>60 mins</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">BSU Estimate</label>
          <input 
            type="number" 
            placeholder={(Math.floor(Math.random() * 45) + 5).toString()}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Auto-calculated based on duration and category</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={() => setShowCreateForm(false)}
            variant="outline" 
            className="flex-1"
          >
            Cancel
          </Button>
          <Button className="flex-1 bg-black text-white hover:bg-gray-800">
            List Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TradeProposal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Trade Proposal</CardTitle>
          <CardDescription>Review the BSU balance for this trade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Your Item BSU</span>
              <span className="font-bold text-lg">{proposalData?.itemBSU}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Service BSU</span>
              <span className="font-bold text-lg">{proposalData?.serviceBSU}</span>
            </div>
            <div className={`flex justify-between items-center p-3 rounded-lg ${
              proposalData?.isMismatch ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <span className="text-sm text-gray-600">BSU Difference</span>
              <span className={`font-bold text-lg ${
                proposalData?.isMismatch ? 'text-red-600' : 'text-green-600'
              }`}>
                {proposalData?.delta}
              </span>
            </div>
          </div>

          {proposalData?.isMismatch && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Imbalanced Trade:</strong> Your offer ({proposalData?.itemBSU} BSU) and request ({proposalData?.serviceBSU} BSU) have a {proposalData?.deltaPercentage.toFixed(1)}% difference. Continue anyway?
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={() => {
                setSelectedService(null);
                setProposalData(null);
              }}
              variant="outline" 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-black text-white hover:bg-gray-800">
              Confirm Trade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Service-as-Inventory
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            No Goods? Just Good at Things!
          </p>
        </div>

        {/* Create Service Tab */}
        <div className="mb-12 flex justify-center">
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Create a Service
          </Button>
        </div>

        {/* Create Service Form */}
        {showCreateForm && (
          <div className="max-w-2xl mx-auto mb-12">
            <CreateServiceForm />
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Trade Proposal Modal */}
        {selectedService && proposalData && <TradeProposal />}
      </div>
    </section>
  );
};

export default ServiceAsInventory;