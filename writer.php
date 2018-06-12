<?
$a = new stdClass();
$a -> studentData = json_decode($_REQUEST['studentData']);
$a -> stats = json_decode($_REQUEST['stats']);
$a -> netid =$_SERVER['cn'];
if ($a -> studentData[0] == "finished")
{
$info= $_SERVER['cn'].","."finished\n";   
file_put_contents("data/winners.csv",$info); 
}

$a = json_encode($a);
file_put_contents("data/".$_SERVER['cn'],$a);
print($a);
?>