<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>Robbie's Pages</title>
        <meta name="description" content="Preview of mock-ups for Robbie">
        <meta name="Themba Nyathi" content="SitePoint">

        <link rel="stylesheet" href="css/styles.css?v=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css">


    </head>

    <body>
        <header>
            <div class="main-title">
                <div class="main-title-frame">
                    <b><div class="burgerMenu"><i class="bi bi-list"></i></div><span id="titleSpan">CLOUDCONVERT</span></b>

                    <div class="main-menu">
                        <a href="index.html">HOME</a>
                        <a href="about.html?h=1">ABOUT</a>
                        <a href="writes.html">WRITES</a>
                        <a href="edits.html">EDITS</a>
                        <a href="contact.html">CONTACT</a>
                    </div>

                </div>
            </div>
        </header>
        <?php

            require_once("vendor/autoload.php");
            use \CloudConvert\CloudConvert;
            use \CloudConvert\Models\Job;
            use \CloudConvert\Models\Task;

            $cloudconvert = new CloudConvert(['api_key' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGJkNjEwMjVhZDZjZTRiYzI0OTUwNzNmNjYxNTBkMDA1YTM5ZTJiYWIyMjRkZWFjZjAxMjE2MTMzMmQzZDdiMWQyYjIyZDk1ZTUwNDMzMzYiLCJpYXQiOjE2Mjc3NTgzMTkuNTgyNjMxLCJuYmYiOjE2Mjc3NTgzMTkuNTgyNjMzLCJleHAiOjQ3ODM0MzE5MTkuNTQxMDk0LCJzdWIiOiI1MTEzMDk1NyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.ntEd50YLulHXGBBPdB1Gha_hrrlX4YO3z6K6ErjDbKc49rirTY7wRoXHZf-o7C2rkRxsnujkjs8pfITYWvlxUP3DESgR1Gr1uArQUondn62FlCW6beJOUIwAHoMnJveIlQK20Wf-hnNceuBNtK5aiblv3O5IeD8SW4HATwOQiPSOJyMjuL9h4Dh6yPzTMPwxBpT5O9X86R1bvulPmtu0V1rdDHcxksHrhAQq1Qs_c3CKZfGTyvJW5Ye9jqCQTvyJDhkWP2DWgtVNTjt0sngpKm90poTLZ_HAy22voCT4bb3qsMn0iHIP-vyyOJrgvhI5i8LFZG7jKPPv65i8hvUcPc6jHkWeNFeXtObWKfJts-Fd40Y3U6XNKbr49Id2EjtjM6jwwQqs5nLi_9ChQabHp1awWISKnTOsPPSgLjTViHJx4qNmPsycVGu6TcLwnAMYoV5_QOsRDL2NmmCKwyc1wDLd4OTF9y80ew0KOxuwHUqMmtZRQUJr40kqn7DaEfE829U3VIY6WPaqUUT4bkareJBT3p2GAR6RQEnF4BUGEIBrk1rtEzTyDt0-urEm_BEDoI1-PuVE4VbIMUpo_pZoh2O_kQNB-yb3k7WV-xKijqQk0NjTe3bxFSX_Q8q92HWI1RrdOCLIDpaMpLtD24u9kLD7h8vVktIVrXrRi8pSvVo']);

            $job = (new Job())
               ->addTask(
                   (new Task('import/url', 'delta-import-1'))
                     ->set('url', 'https://www.robbietuckerwrites.com/upload/SPATS.doc')
                     ->set('filename', 'SPATS.doc')
                 )
               ->addTask(
                   (new Task('convert', 'delta-convert-1'))
                     ->set('input', ["delta-import-1"])
                     ->set('output_format', 'html')
                 )
               ->addTask(
                   (new Task('export/url', 'delta-export-1'))
                     ->set('input', ["delta-convert-1"])
                     ->set('inline', false)
                     ->set('archive_multiple_files', false)
                 );

            $cloudconvert->jobs()->create($job);

            $cloudconvert->jobs()->wait($job); // Wait for job completion

            foreach ($job->getExportUrls() as $file) {

                $source = $cloudconvert->getHttpTransport()->download($file->url)->detach();
                $dest = fopen('converts/' . $file->filename, 'w');

                // stream_copy_to_stream($source, $dest);
                if(stream_copy_to_stream($source, $dest)){
                    echo success;
                }
                else{ echo "Failure"; }

            }
        ?>
    </body>
</html>
