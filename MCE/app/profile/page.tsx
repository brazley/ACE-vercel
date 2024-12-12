"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon } from 'lucide-react'

interface UserProfile {
  name: string
  photo: string
  headline: string
  company: string
  location: string
  about: string
  experience: {
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }[]
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user) return
    // For now, we'll just use the user data from auth
    setProfile({
      name: user.displayName || '',
      photo: user.photoURL || '',
      headline: '',
      company: '',
      location: '',
      about: '',
      experience: []
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = async () => {
    if (!user || !editedProfile) return
    // For now, we'll just update the local state
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProfile) return
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    if (!editedProfile) return
    const updatedExperience = [...editedProfile.experience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setEditedProfile({ ...editedProfile, experience: updatedExperience })
  }

  const addExperience = () => {
    if (!editedProfile) return
    setEditedProfile({
      ...editedProfile,
      experience: [
        ...editedProfile.experience,
        { title: '', company: '', startDate: '', endDate: '', description: '' }
      ]
    })
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile</CardTitle>
            {!isEditing && (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <PencilIcon className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={editedProfile?.photo} alt={editedProfile?.name} />
                  <AvatarFallback>{editedProfile?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Input
                  name="photo"
                  value={editedProfile?.photo}
                  onChange={handleChange}
                  placeholder="Photo URL"
                />
              </div>
              <Input
                name="name"
                value={editedProfile?.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="headline"
                value={editedProfile?.headline}
                onChange={handleChange}
                placeholder="Headline"
              />
              <Input
                name="company"
                value={editedProfile?.company}
                onChange={handleChange}
                placeholder="Company"
              />
              <Input
                name="location"
                value={editedProfile?.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <Textarea
                name="about"
                value={editedProfile?.about}
                onChange={handleChange}
                placeholder="About"
              />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                {editedProfile?.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      placeholder="Job Title"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      placeholder="Company"
                    />
                    <div className="flex space-x-2">
                      <Input
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        placeholder="Start Date"
                      />
                      <Input
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        placeholder="End Date"
                      />
                    </div>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                ))}
                <Button type="button" onClick={addExperience} variant="outline">
                  Add Experience
                </Button>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.photo} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-gray-600">{profile.headline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BuildingIcon className="w-4 h-4" />
                <span>{profile.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPinIcon className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p>{profile.about}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                {profile.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

