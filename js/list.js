/**
 * Created by Administrator on 2017/9/22.
 */
window.onload=function(){
    left_scroll();
}
function left_scroll(){
    //1.��ȡ��ߵ�ulԪ��
    var oUl=document.querySelector('.main .main_left ul');
    //2.��ȡ��ߵ�ul�߶�
    var ulH=oUl.offsetHeight;
    //3.��ȡul��Ԫ�صĸ߶�
    var ulParH=oUl.parentNode.offsetHeight;
    //��ȡͷ��header�ĸ߶�
    var headerH=document.querySelector('.header').offsetHeight;
    //console.log(ulParH)
    //4.����y����ƶ�����ֵ
    var maxDistance=0;
    var minDistance=ulParH-ulH-headerH;
    //5.�����ʼ����
    var startY= 0,delayDistance=150;
    //6.�ƶ��ľ�����ƶ����ܾ���
    var moveY= 0,totalMove=0;

    function startTransition(curEle){
        curEle.style.transition='all,0.5'
    }
    function setTransform(curEle,distance){
        curEle.style.transform='translateY('+distance+'px)';
    }
    function delTransition(curEle){
        curEle.style.transition='';
    }

    oUl.addEventListener('touchstart',function(e){
        startY= e.touches[0].clientY;
    });
    oUl.addEventListener('touchmove',function(e){
       moveY=e.touches[0].clientY-startY;
        if(moveY+totalMove>delayDistance+maxDistance){
            moveY=0;
            totalMove=delayDistance+maxDistance;
            console.log(totalMove)
        }else if(moveY+totalMove<minDistance-delayDistance){
            moveY=0;
            totalMove=delayDistance+minDistance;
        }
        delTransition(this);
        setTransform(this,moveY+totalMove);

    });
    oUl.addEventListener('touchend',function(e){
        totalMove+=moveY;
        if(totalMove>maxDistance){
            totalMove=maxDistance;
        }else if(totalMove<minDistance){
            totalMove=minDistance;
        }
        startTransition(this);
        setTransform(this,totalMove);
    })
 tool.tap(oUl,function(e){
     var oLi= e.target.parentNode;
     var oLis=document.querySelectorAll('.main .main_left ul li');
     var oLisH=document.querySelector('.main .main_left ul li').offsetHeight;
     oLis.forEach(function(item,index){
         item.className='';
         item.dataIndex=index;
     });
     oLi.className='current';
     var distance=-oLi.dataIndex*oLisH;
     console.log(distance)
     if(distance>maxDistance){
         distance=maxDistance;
     }else if(distance<minDistance){
         distance=minDistance;
     }
     startTransition(oUl);
     setTransform(oUl,distance);
     console.log(oLi.dataIndex)
 })

}