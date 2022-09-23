<?php
$arr = 	array(
		array('name' => 'John', 'age' => 30, 'website' => 'http://learnphp.co'),
		array('name' => 'Joe', 'age' => 28, 'website' => 'http://johnmorrisonline.com'),
		array('name' => 'Amy', 'age' => 32, 'website' => 'http://amy.com'),
		array('name' => 'Alex', 'age' => 22, 'website' => 'http://thealex.com'),
		array('name' => 'Pat', 'age' => 40, 'website' => 'http://patsjourney.com'),
);
	
?>

<pre><?php print_r($arr); ?></pre>

<?php
	array_multisort(array_map(function($element){
        return $element["age"];
    },$arr),SORT_DESC,$arr);
?>



<pre><?php print_r($arr); ?></pre>