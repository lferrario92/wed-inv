<script setup>
import { ref } from 'vue'

const count = ref(0)

var id = '1_SCbCnQeyCUvUnIRWQFn4d1sRHgs8W3hUXMt7omHP38';
var gid = '0';

let url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;

const test = () => {
  fetch(url)
  .then(response => response.text())
  .then(data => console.log(data))
}

const test2 = async () => {
  try {
    // First, get the sheet data to understand the structure
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Remove the Google Data callback
    
    console.log('Current sheet data:', json);
    
    // Example: Update cell A1 with current timestamp
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1!A1?valueInputOption=RAW`;
    
    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        range: 'Sheet1!A1',
        majorDimension: 'ROWS',
        values: [[`Updated at: ${new Date().toLocaleString()}`]]
      })
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Error: ${updateResponse.status}`);
    }
    
    const result = await updateResponse.json();
    console.log('Update successful:', result);
    alert('Sheet updated successfully!');
    
  } catch (error) {
    console.error('Error updating sheet:', error);
    alert(`Error: ${error.message}\nMake sure you're authenticated and have the correct permissions.`);
  }
}
</script>

<template>
  <div>
    <h1>hola</h1>
    <button @click="test">test</button>
    <h1>hola</h1>
    <button @click="test2">test2</button>
  </div>
</template>