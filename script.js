window.onload=()=>{
      fetchTask();
}
// window.onload function tb call hota hai jb page browser me  load hota hai
const openDilog=()=>{
          new Swal({
                    html:`
                     <div class="text-left space-y-4">
                        <h1 class="text-xl font-semibold text-black">New task </h1>
                        <form onsubmit="createTask(event)" class="space-y-5">
                              <input id ="task" class="px-3 py-2 border border-gray-300 w-full rounded"  placeholder="Enter task name "/>
                              <input id ="date" type ="date" class="px-3 py-2 border border-gray-300 w-full rounded" />
                              <button class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white mt-4"> Add</button>
                        </form>
                    </div>`,
                    showConfirmButton:false
          })
}
const createTask=(e)=>{
      e.preventDefault();
      const taskInput = document.getElementById("task");
      const task=taskInput.value.trim();
      const dateInput =document.getElementById("date");
      const date = dateInput.value;
      //   .trim() => function input ke aage or puche se bina kam se space ko hata deta hai 
      //   for example :
      //   string str="  Ram and Shayam  "
      //   str.trim()=>"Ram and Shaym"
      const key=Date.now();
      //Date.now()=> its give random unique number to use it as a Key
      const payload=JSON.stringify({
            task:task,
            date:date,
            status:"Sheduled"
      })
      
      localStorage.setItem(key,payload);
      new Swal({
            icon:"success",
            title:"Task Created"
      
      }).then(()=>{
            location.href=location.href;
      })
}
const selectStatus=(value,status)=>{
      if(value==status){
            return "selected";
      }
      else{
            return "";
      }
}
const fetchTask=()=>{
      var i=1;
      const keys=Object.keys(localStorage);
      const UiContainer=document.getElementById("ui-container");
      for(var key of keys){
            const data= JSON.parse(localStorage.getItem(key));
            const ui=`
                 <tr class="border-b border-slate-200">
                                        <td class="p-3">${i}</td>
                                        <td class="text-gray-600">${data.task}</td>
                                        <td class="text-gray-600">${moment(data.date).format('DD MMM YYYY')}</td>
                                        <td class="text-gray-600">
                                           <select name="" id="" class="border border-gray-300 rounede p-1" onchange="updateStatus(event,'${key}')">
                                                <option value="sheduled" ${selectStatus("sheduled",data.status)}>Sheduled</option>
                                                <option value="inProgress" ${selectStatus("inProgress",data.status)}>In Progress</option>
                                                <option value="cancle" ${selectStatus("cancle",data.status)}>cancle</option>
                                                <option value="completed" ${selectStatus("completed",data.status)}>Completed</option>
                                          </select>
                                        </td>
                                        <td>
                                                  <div class="flex items-center justify-center gap-3">
                                                            <button
                                                                  onclick="editTask('${data.task}','${key}','${data.date}')" class=" hover:bg-violet-600 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                                                      <i class="ri-pencil-line"></i>
                                                            </button>
                                                            <button
                                                                     onclick="deleteTask('${key}')"  class=" hover:bg-amber-600 bg-rose-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                                                      <i class="ri-delete-bin-6-line"></i>
                                                            </button>
                                                  </div>
                                        </td>
                              </tr>
            `
            UiContainer.innerHTML+=ui;
            i++;
      }
}
const deleteTask=(key)=>{
     localStorage.removeItem(key);
     location.href=location.href
}
const editTask=(task,key,date)=>{
      console.log(task,date,key)
       new Swal({
                    html:`
                     <div class="text-left space-y-4">
                        <h1 class="text-xl font-semibold text-black">New task </h1>
                        <form onsubmit="saveTask(event,'${key}')" class="space-y-5">
                              <input value="${task}" id ="edited-Task" class="px-3 py-2 border border-gray-300 w-full rounded"  placeholder="Enter task name "/>
                              <input value="${date}" id ="edited-Date" type ="date" class="px-3 py-2 border border-gray-300 w-full rounded" />
                              <button  class="bg-indigo-600 hover:bg-rose-700 px-6 py-2 rounded text-white mt-4"> Save</button>
                        </form>
                    </div>`,
                    showConfirmButton:false
          })
      
      }
      const saveTask=(e,key)=>{
            e.preventDefault();
            const EditedTask=document.getElementById("edited-Task").value.trim();
            const EditedDate=document.getElementById("edited-Date").value;
            console.log(typeof(JSON.parse(localStorage.getItem(key))));
            const payload=JSON.stringify({
                  task:EditedTask,
                  date:EditedDate
            })
            localStorage.setItem(key,payload);
            new Swal({
                  icon:"success",
                  title:"Task Updated"
            }).then(()=>{
                  location.href=location.href;
            })
}
const updateStatus=(e,key)=>{
      const status=e.target.value;
      const payload=JSON.parse(localStorage.getItem(key));
      payload.status=status;
      console.log(payload);
      localStorage.setItem(key,JSON.stringify(payload));
      new Swal({
            icon:"success",
            title:"Status Updated",
            text:status.toUpperCase()
      })
      
}
const filter=(input)=>{
      const keyWord=input.value.trim().toLowerCase();
      const keys=Object.keys(localStorage);
      const allData=[]
      for(var key of keys){
            const data=JSON.parse(localStorage.getItem(key));
            allData.push(data);
      }

   const filtered= allData.filter((item)=>{
      return item.task.toLowerCase().indexOf(keyWord)!=-1
     })
     var i=1;
     const UiContainer=document.getElementById("ui-container");
     UiContainer.innerHTML=""
      for(var item of filtered){
            
            const ui=`
                 <tr class="border-b border-slate-200">
                                        <td class="p-3">${i}</td>
                                        <td class="text-gray-600">${item.task}</td>
                                        <td class="text-gray-600">${moment(item.date).format('DD MMM YYYY')}</td>
                                        <td class="text-gray-600">
                                           <select name="" id="" class="border border-gray-300 rounede p-1" onchange="updateStatus(event,'${key}')">
                                                <option value="sheduled" ${selectStatus("sheduled",item.status)}>Sheduled</option>
                                                <option value="inProgress" ${selectStatus("inProgress",item.status)}>In Progress</option>
                                                <option value="cancle" ${selectStatus("cancle",item.status)}>cancle</option>
                                                <option value="completed" ${selectStatus("completed",item.status)}>Completed</option>
                                          </select>
                                        </td>
                                        <td>
                                                  <div class="flex items-center justify-center gap-3">
                                                            <button
                                                                  onclick="editTask('${item.task}','${key}','${item.date}')" class=" hover:bg-violet-600 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                                                      <i class="ri-pencil-line"></i>
                                                            </button>
                                                            <button
                                                                     onclick="deleteTask('${key}')"  class=" hover:bg-amber-600 bg-rose-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                                                      <i class="ri-delete-bin-6-line"></i>
                                                            </button>
                                                  </div>
                                        </td>
                              </tr>
            `
            UiContainer.innerHTML+=ui;
            i++;
      }
}