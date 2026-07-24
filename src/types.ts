/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface CoachingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  lessons: number;
  popular?: boolean;
  type: 'fitness' | 'pilates' | 'hybrid';
  features: PackageFeature[];
}

export interface ClientTransformation {
  id: string;
  name: string;
  age: number;
  duration: string;
  initialWeight: number;
  currentWeight: number;
  initialFat: number;
  currentFat: number;
  category: 'Kilo Kaybı' | 'Sıkılaşma' | 'Kas Kazanımı';
  beforeImage: string;
  afterImage: string;
  quote: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  fitnessGoal: 'fat_loss' | 'toning' | 'muscle_gain' | 'posture_flexibility';
  primaryInterest: 'pilates' | 'fitness' | 'hybrid';
  hasInjuries: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  message?: string;
}
