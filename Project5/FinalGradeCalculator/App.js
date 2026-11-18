
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const newAssignment = () => ({
  id: `${Date.now()}-${Math.random()}`,
  name: 'Homework',
  earned: '',
  possible: '',
  weight: '',
});

export default function App() {
  const [screen, setScreen] = useState('home');
  const [assignments, setAssignments] = useState([newAssignment()]);
  const [finalWeight, setFinalWeight] = useState('20');
  const [targetGrade, setTargetGrade] = useState('90');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const updateAssignment = (id, field, value) => {
    setAssignments((old) =>
      old.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addAssignment = () => {
    setAssignments((old) => [...old, newAssignment()]);
    setError('');
  };

  const removeAssignment = (id) => {
    if (assignments.length === 1) {
      setError('Keep at least one assignment.');
      return;
    }

    setAssignments((old) => old.filter((item) => item.id !== id));
    setError('');
  };

  const totalAssignmentWeight = assignments.reduce(
    (sum, item) => sum + (Number(item.weight) || 0),
    0
  );

  const calculateGrades = () => {
    const final = Number(finalWeight);
    const target = Number(targetGrade);

    if (
      finalWeight.trim() === '' ||
      targetGrade.trim() === '' ||
      !Number.isFinite(final) ||
      !Number.isFinite(target) ||
      final <= 0 ||
      final > 100 ||
      target < 0 ||
      target > 100
    ) {
      setError('Enter a final exam weight above 0 and no more than 100, and a target grade between 0 and 100.');
      return;
    }

    let weightedPoints = 0;
    let assignmentWeight = 0;

    for (let i = 0; i < assignments.length; i++) {
      const item = assignments[i];
      const earned = Number(item.earned);
      const possible = Number(item.possible);
      const weight = Number(item.weight);

      if (
        item.earned.trim() === '' ||
        item.possible.trim() === '' ||
        item.weight.trim() === '' ||
        !Number.isFinite(earned) ||
        !Number.isFinite(possible) ||
        !Number.isFinite(weight) ||
        earned < 0 ||
        possible <= 0 ||
        earned > possible ||
        weight <= 0 ||
        weight > 100
      ) {
        setError(`Please check Assignment ${i + 1}. Enter valid points and a weight greater than 0.`);
        return;
      }

      weightedPoints += (earned / possible) * weight;
      assignmentWeight += weight;
    }

    const totalWeight = assignmentWeight + final;

    if (Math.abs(totalWeight - 100) > 0.01) {
      setError(
        `Your assignment weights total ${assignmentWeight.toFixed(2)}%. Add the final exam weight of ${final.toFixed(2)}% to reach 100%.`
      );
      return;
    }

    const current = (weightedPoints / assignmentWeight) * 100;
    const needed = ((target - weightedPoints) / final) * 100;

    const comparisons = [60, 70, 80, 90, 100].map((score) => ({
      score,
      finalGrade: weightedPoints + (score / 100) * final,
    }));

    setResult({
      current,
      weightedPoints,
      assignmentWeight,
      final,
      target,
      needed,
      comparisons,
      assignments: [...assignments],
    });

    setError('');
    setScreen('results');
  };

  const resetApp = () => {
    setAssignments([newAssignment()]);
    setFinalWeight('20');
    setTargetGrade('90');
    setResult(null);
    setError('');
    setScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.logo}>GradeWise</Text>
        <Text style={styles.headerSubtitle}>YOUR PERSONAL GRADE PLANNER</Text>
      </View>

      {screen === 'home' && (
        <ScrollView contentContainerStyle={styles.home}>
          <Text style={styles.eyebrow}>STUDENT GRADE CENTER</Text>
          <Text style={styles.welcome}>Stay on top of your grades.</Text>
          <Text style={styles.description}>
            Track assignments, calculate weighted grades, and plan for your final exam.
          </Text>

          <View style={styles.homeCard}>
            <Text style={styles.homeCardTitle}>Grade Calculator</Text>
            <Text style={styles.homeCardDescription}>
              Enter your assignment scores and their course weights to see where you stand.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setError('');
                setScreen('input');
              }}
            >
              <Text style={styles.buttonText}>Open Grade Calculator →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>How it works</Text>
            <Text style={styles.tipText}>
              1. Add your homework, quizzes, and exams.
            </Text>
            <Text style={styles.tipText}>
              2. Enter each grade and its course weight.
            </Text>
            <Text style={styles.tipText}>
              3. Find out what you need on your final.
            </Text>
          </View>
        </ScrollView>
      )}

      {screen === 'input' && (
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backButton}>← Back to Home</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Grade Calculator</Text>
          <Text style={styles.subtitle}>
            Add your grades and course weights below.
          </Text>

          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.summaryLabel}>Assignment weights</Text>
              <Text style={styles.summaryNumber}>
                {totalAssignmentWeight.toFixed(1)}%
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View>
              <Text style={styles.summaryLabel}>Final exam</Text>
              <Text style={styles.summaryNumber}>{finalWeight || '0'}%</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={[
                styles.summaryNumber,
                Math.abs(totalAssignmentWeight + (Number(finalWeight) || 0) - 100) < 0.01
                  ? styles.goodText
                  : styles.warningText
              ]}>
                {(totalAssignmentWeight + (Number(finalWeight) || 0)).toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Course Assignments</Text>
                <Text style={styles.sectionDescription}>
                  Homework, quizzes, projects, and exams
                </Text>
              </View>
              <Text style={styles.countBadge}>{assignments.length}</Text>
            </View>

            {assignments.map((item, index) => (
              <View key={item.id} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <Text style={styles.assignmentTitle}>
                    Assignment {index + 1}
                  </Text>
                  <TouchableOpacity onPress={() => removeAssignment(item.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Assignment name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Example: Homework 1"
                  value={item.name}
                  onChangeText={(value) =>
                    updateAssignment(item.id, 'name', value)
                  }
                />

                <View style={styles.inputRow}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Points earned</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="90"
                      keyboardType="decimal-pad"
                      value={item.earned}
                      onChangeText={(value) =>
                        updateAssignment(item.id, 'earned', value)
                      }
                    />
                  </View>

                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Points possible</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="100"
                      keyboardType="decimal-pad"
                      value={item.possible}
                      onChangeText={(value) =>
                        updateAssignment(item.id, 'possible', value)
                      }
                    />
                  </View>
                </View>

                <Text style={styles.label}>Weight of this assignment (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Example: 15"
                  keyboardType="decimal-pad"
                  value={item.weight}
                  onChangeText={(value) =>
                    updateAssignment(item.id, 'weight', value)
                  }
                />
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addAssignment}
            >
              <Text style={styles.addButtonText}>＋ Add Another Assignment</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Final Exam Settings</Text>
            <Text style={styles.sectionDescription}>
              Complete the remaining course weight.
            </Text>

            <Text style={styles.label}>Final exam weight (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Example: 20"
              keyboardType="decimal-pad"
              value={finalWeight}
              onChangeText={setFinalWeight}
            />

            <Text style={styles.label}>Desired final course grade (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Example: 90"
              keyboardType="decimal-pad"
              value={targetGrade}
              onChangeText={setTargetGrade}
            />

            {error !== '' && (
              <Text style={styles.error}>{error}</Text>
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={calculateGrades}
            >
              <Text style={styles.buttonText}>Calculate My Grades</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {screen === 'results' && result && (
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity onPress={() => setScreen('input')}>
            <Text style={styles.backButton}>← Back to Assignments</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Your Grade Results</Text>
          <Text style={styles.subtitle}>
            Here's where you stand in your course.
          </Text>

          <View style={styles.resultHero}>
            <Text style={styles.resultLabel}>Current weighted grade</Text>
            <Text style={styles.resultNumber}>
              {result.current.toFixed(2)}%
            </Text>
            <Text style={styles.resultSmall}>
              Based on {result.assignmentWeight.toFixed(2)}% of your course
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Score needed on final exam</Text>
            <Text style={styles.highlightNumber}>
              {result.needed <= 0
                ? 'Target already reached'
                : result.needed > 100
                ? `${result.needed.toFixed(2)}%`
                : `${result.needed.toFixed(2)}%`}
            </Text>
            <Text style={styles.resultSmall}>
              To finish with a {result.target.toFixed(2)}% overall grade
            </Text>

            {result.needed > 100 && (
              <Text style={styles.warningMessage}>
                You would need more than 100% on the final to reach this target.
              </Text>
            )}
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Assignment Breakdown</Text>

            {result.assignments.map((item) => {
              const percentage =
                (Number(item.earned) / Number(item.possible)) * 100;

              return (
                <View key={item.id} style={styles.breakdownRow}>
                  <View style={styles.breakdownInfo}>
                    <Text style={styles.breakdownName}>
                      {item.name.trim() || 'Unnamed Assignment'}
                    </Text>
                    <Text style={styles.breakdownDetail}>
                      {item.earned}/{item.possible} points · {item.weight}% weight
                    </Text>
                  </View>
                  <Text style={styles.breakdownGrade}>
                    {percentage.toFixed(1)}%
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Compare Final Exam Scores</Text>
            <Text style={styles.sectionDescription}>
              See how different exam scores change your final grade.
            </Text>

            {result.comparisons.map((item) => (
              <View key={item.score} style={styles.comparisonRow}>
                <Text style={styles.comparisonText}>
                  Final exam: {item.score}%
                </Text>
                <Text style={styles.comparisonResult}>
                  {item.finalGrade.toFixed(2)}%
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={resetApp}
          >
            <Text style={styles.buttonText}>Return Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  header: {
    backgroundColor: '#173B68',
    padding: 22,
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#DCE8F5',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
  },
  home: {
    padding: 24,
    paddingBottom: 45,
    flexGrow: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#6480A4',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  welcome: {
    color: '#173B68',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 39,
  },
  description: {
    color: '#65748B',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 22,
  },
  homeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    marginTop: 10,
    elevation: 2,
  },
  homeCardTitle: {
    color: '#173B68',
    fontSize: 21,
    fontWeight: 'bold',
  },
  homeCardDescription: {
    color: '#65748B',
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: '#E8EFF8',
    borderRadius: 14,
    padding: 19,
    marginTop: 18,
  },
  tipTitle: {
    color: '#173B68',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  tipText: {
    color: '#526781',
    lineHeight: 25,
  },
  content: {
    padding: 20,
    paddingBottom: 45,
  },
  backButton: {
    color: '#285184',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    color: '#173B68',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#718096',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
    elevation: 1,
  },
  summaryLabel: {
    color: '#718096',
    fontSize: 10,
    fontWeight: '600',
  },
  summaryNumber: {
    color: '#173B68',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#E1E7EF',
  },
  goodText: {
    color: '#16845B',
  },
  warningText: {
    color: '#C07819',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 16,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#173B68',
    fontSize: 19,
    fontWeight: 'bold',
  },
  sectionDescription: {
    color: '#718096',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  countBadge: {
    color: '#173B68',
    backgroundColor: '#E8EFF8',
    overflow: 'hidden',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontWeight: 'bold',
  },
  assignmentCard: {
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  assignmentTitle: {
    color: '#173B68',
    fontSize: 15,
    fontWeight: 'bold',
  },
  removeButton: {
    color: '#C04444',
    fontWeight: '600',
    fontSize: 12,
  },
  label: {
    color: '#405675',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE3ED',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#243B53',
    minWidth: 0,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputColumn: {
    flex: 1,
    minWidth: 0,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: '#285184',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: '#285184',
    fontSize: 14,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#173B68',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 17,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  error: {
    color: '#B42318',
    backgroundColor: '#FEF0EF',
    padding: 12,
    borderRadius: 8,
    lineHeight: 20,
    marginTop: 14,
  },
  resultHero: {
    backgroundColor: '#173B68',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 14,
  },
  resultLabel: {
    color: '#718096',
    fontSize: 14,
    fontWeight: '600',
  },
  resultNumber: {
    color: '#FFFFFF',
    fontSize: 39,
    fontWeight: 'bold',
    marginTop: 8,
  },
  resultSmall: {
    color: '#718096',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 22,
    alignItems: 'center',
    marginBottom: 17,
  },
  highlightNumber: {
    color: '#16845B',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 9,
    textAlign: 'center',
  },
  warningMessage: {
    color: '#A65E12',
    backgroundColor: '#FFF4E5',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 19,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F5',
  },
  breakdownInfo: {
    flex: 1,
  },
  breakdownName: {
    color: '#173B68',
    fontWeight: 'bold',
    fontSize: 14,
  },
  breakdownDetail: {
    color: '#718096',
    fontSize: 12,
    marginTop: 4,
  },
  breakdownGrade: {
    color: '#16845B',
    fontWeight: 'bold',
    fontSize: 15,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F5',
  },
  comparisonText: {
    color: '#405675',
    fontWeight: '600',
  },
  comparisonResult: {
    color: '#16845B',
    fontWeight: 'bold',
  },
});
