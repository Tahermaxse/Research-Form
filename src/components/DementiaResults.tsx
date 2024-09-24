import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const DementiaResults = ({ formData }: { formData: FormData }) => {
  const symptomQuestions = Object.entries(formData).slice(0, 11);
  const lifestyleQuestions = Object.entries(formData).slice(11, 15);
  const riskFactors = Object.entries(formData).slice(15);

  const calculatePercentages = (ratings: ArrayLike<unknown> | { [s: string]: unknown; }) => {
    const totalScore = Object.values(ratings).reduce((sum, value) => sum + parseInt(value), 0);
    const maxScore = Object.keys(ratings).length * 10;
    const percentage = (totalScore / maxScore) * 100;
    return { totalScore, maxScore, percentage };
  };

  const estimateDementiaStage = (percentage: number) => {
    if (percentage < 20) return { stage: 'Non-Demented', description: 'No significant symptoms detected', level: 0 };
    if (percentage < 40) return { stage: 'Very Mild Dementia', description: 'Early signs of cognitive decline', level: 1 };
    if (percentage < 60) return { stage: 'Mild Dementia', description: 'Mild cognitive impairment', level: 2 };
    if (percentage < 80) return { stage: 'Moderate Dementia', description: 'Moderate cognitive impairment', level: 3 };
    return { stage: 'Severe Dementia', description: 'Severe cognitive impairment', level: 4 };
  };

  const { totalScore, maxScore, percentage } = calculatePercentages(Object.fromEntries(symptomQuestions));
  const result = estimateDementiaStage(percentage);

  const chartData = symptomQuestions.map(([key, value]) => ({ name: key, value: parseInt(value) }));

  return (
    <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-12 space-y-8">
      <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Dementia Assessment Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-lg">
              <p><span className="font-semibold">Total Score:</span> {totalScore} out of {maxScore}</p>
              <p><span className="font-semibold">Percentage:</span> {percentage.toFixed(2)}%</p>
            </div>
            <div className="text-lg">
              <p><span className="font-semibold">Estimated Stage:</span> {result.stage}</p>
              <p><span className="font-semibold">Description:</span> {result.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Symptom Scores</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  textAnchor="end" height={80} />
                <YAxis />
                <Tooltip cursor={false}/>
                <Legend />
                <Bar dataKey='value' fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Detailed Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100 text-left font-semibold">Question</TableHead>
                  <TableHead className="bg-gray-100 text-left font-semibold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symptomQuestions.map(([key, value]) => (
                  <TableRow key={key} className="hover:bg-gray-50">
                    <TableCell className="border-t">{key}</TableCell>
                    <TableCell className="border-t">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Health and Lifestyle Factors</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableBody>
                {lifestyleQuestions.map(([key, value]) => (
                  <TableRow key={key} className="hover:bg-gray-50">
                    <TableCell className="border-t font-medium">{key}</TableCell>
                    <TableCell className="border-t">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Risk Factors</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableBody>
                {riskFactors.map(([key, value]) => (
                  <TableRow key={key} className="hover:bg-gray-50">
                    <TableCell className="border-t font-medium">{key}</TableCell>
                    <TableCell className="border-t">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DementiaResults;