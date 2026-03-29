import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../api/api";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

enum taskListTabs {
  AllTasks="All Tasks",
  Completed="Completed",
  Overdue="Overdue"
}

function TaskListScreen() {
  const [activeTab, setActiveTab ] = useState<taskListTabs>(taskListTabs.AllTasks)

  const{data:allTasks,isLoading , isError} = useQuery({
    queryKey:["ALL TASKS"],
    queryFn: fetchAllTasks
  })

  const navigation = useNavigation();

   const TaskComponent = ({task}:{task:any}) => {
    return (
      <TouchableOpacity style={styles.taskItem}
       onPress={() => navigation.navigate("Task Details", {taskId: task.id})} 
      >
        <Text style={styles.taskItemTitle}>{task.title}</Text>
        <Text style={styles.taskItemDescription}>{task.description}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View  style={styles.container}>
       <View style={styles.tabHeaders}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === taskListTabs.AllTasks && styles.activeTab]}
          onPress={() => setActiveTab(taskListTabs.AllTasks)}
        >
            <Text style={[styles.tabText, activeTab === taskListTabs.AllTasks && styles.activeTabText]}>All Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.tabButton, styles.middleTab , activeTab === taskListTabs.Completed && styles.activeTab]}
            onPress={() => setActiveTab(taskListTabs.Completed)}
        >
            <Text style={[styles.tabText, activeTab === taskListTabs.Completed && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.tabButton, activeTab === taskListTabs.Overdue && styles.activeTab]}
            onPress={() => setActiveTab(taskListTabs.Overdue)}
        >
            <Text style={[styles.tabText, activeTab === taskListTabs.Overdue && styles.activeTabText]}>Overdue</Text>
        </TouchableOpacity>
       </View>
        <Spinner visible={isLoading} />
        {(allTasks && allTasks.length === 0) ?
         <Text>No tasks found. Create your first task!</Text>
          : allTasks?.map((task:any) => <TaskComponent key={task.id} task={task} />)}
        {isError && <Text style={{color:"red"}}>An error occurred while fetching tasks.</Text>}
        <StatusBar style="auto" />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate("Add Task")}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>  
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
     tabHeaders: {
        flexDirection: 'row',
        backgroundColor: '#4a7bc2',
        borderRadius: 15,
        marginVertical: 24,
        marginHorizontal:20,
        overflow: 'hidden',
    },
     tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#cfd4dced',
    },
    activeTab: {
        backgroundColor: '#4a7bc2',
    },
    tabText: {
        color: '#4a7bc2',
        fontSize: 15,
        fontWeight: '500',
    },
     activeTabText: {
        color:"white",
        fontWeight: '600',
    },
    middleTab: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    },
  addButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#4a7bc2',
    borderRadius: 6,
    width:"80%",
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  taskItem: {
    padding:12, 
    borderWidth:1, 
    borderColor:"#cfd4dced", 
    borderRadius:10, width:"90%", 
    marginHorizontal:80, 
    marginVertical:8, 
    elevation:2, 
    backgroundColor:"white"
  },
  taskItemTitle: {
    fontSize:16, 
    fontWeight:"500"
  },
  taskItemDescription: {
    color:"grey"
  }
});

export default TaskListScreen;