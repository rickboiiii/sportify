// "use client";

import {
    Card,
    CardColumn,
    CardFooter,
    CardHeader,
    CardRow,
    CardSpan,
    Container
} from "@/components/Containers/ContainerStyled";

export default function Profile() {
  return (
      <Container>
          <Card>
              <CardHeader>
                  <CardColumn>
                      <img src="" alt="Users Profile Picture"/>
                  </CardColumn>
                  <CardColumn>
                      <h3>Ime (Srednje) Prezime</h3>
                  </CardColumn>
              </CardHeader>
              <CardRow>
                  <CardSpan>
                      <h4>Informacije</h4>
                  </CardSpan>
              </CardRow>
              <CardRow>
                  <CardColumn>
                      <h3>Test 1</h3>
                  </CardColumn>
                  <CardColumn>
                      <h3>Test 2</h3>
                  </CardColumn>
                  <CardColumn>
                      <h3>Test 3</h3>
                  </CardColumn>
              </CardRow>
              <CardFooter>
                  <CardColumn>
                      <CardRow>
                        <h3>Nivo Sposobnosti</h3>
                      </CardRow>
                      <CardRow>
                          **Visual Representation**
                      </CardRow>
                  </CardColumn>
              </CardFooter>
          </Card>
      </Container>
  );
}
