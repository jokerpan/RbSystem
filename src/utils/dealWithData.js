// 处理list数据,根据tplId,将list分割成二维数组,以便布局
export const dealWithListData = (tplId,list) => {
		var newlist = [];
		if(tplId==0){
			var  list1=list.slice(0,1);
			var  list2=list.slice(1,3);
			var  list3=list.slice(3);
			newlist.push(list1,list2,list3)
			require('../less/tpl0.css');
		}
		if(tplId==1){
			var  list1=list.slice(0,1);
			var  list2=list.slice(1,4);
			newlist.push(list1,list2);
			require('../less/tpl1.css');
		}
		
		
		return newlist;
};
